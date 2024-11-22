import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotAllowedError, NotFoundError } from "./errors";
export interface HouseholdDoc extends BaseDoc {
  organization: ObjectId;
  members: Array<ObjectId>;
  dietaryRestrictions: Array<string>;
  preferredLanguage: string;
  pastVisits: Array<Date>;
  specialRequests: string;
}

export default class HouseholdConcept {
  public readonly households = new DocCollection<HouseholdDoc>("households");

  async create(org: ObjectId, members: Array<ObjectId>, diet: Array<string>, language: string, requests: string) {
    if (members.length === 0) {
      throw new BadValuesError("Households must have at least one member");
    }
    const _id = await this.households.createOne({ organization: org, members: members, dietaryRestrictions: diet, preferredLanguage: language, specialRequests: requests, pastVisits: [] });
    return { msg: "HouseholdProfile successfully created!", household: await this.households.readOne({ _id }) };
  }

  async getProfilesByOwner(org: ObjectId) {
    const households = await this.households.readMany({ organization: org }, { sort: { dateUpdated: -1 } });
    if (!households) {
      throw new NotFoundError("Household Profiles not found for organization");
    }
    return households;
  }

  async getProfileById(_id: ObjectId) {
    const household = await this.households.readOne({ _id });
    if (!household) {
      throw new NotFoundError("Household Profile not found for specified id");
    }
    return household;
  }

  async updateMembers(_id: ObjectId, members: Array<ObjectId>) {
    await this.getProfileById(_id);
    if (!members.length) {
      throw new BadValuesError("Household Profiles must have at least one member");
    }
    await this.households.updateOne({ _id }, { members: members });
    return { msg: "Successfully updated Members of Household" };
  }

  async addMember(_id: ObjectId, member: ObjectId) {
    const household = await this.getProfileById(_id);
    household.members.forEach((id) => {
      if (id.toString() === member.toString()) throw new BadValuesError("Member of household already exists!");
    });
    const newMembers = new Array<ObjectId>();
    household.members.forEach((id) => {
      newMembers.push(id);
    });
    newMembers.push(member);
    await this.households.updateOne({ _id }, { members: newMembers });
    return { msg: "Successfully Added New Member to Household" };
  }

  async removeMember(_id: ObjectId, member: ObjectId) {
    const household = await this.getProfileById(_id);
    const idxList = new Array<number>();
    household.members.forEach((id, idx) => {
      if (id.toString() === member.toString()) idxList.push(idx);
    });
    const newMembers = new Array<ObjectId>();
    household.members.forEach((id) => {
      newMembers.push(id);
    });
    for (let i = idxList.length - 1; i >= 0; i--) newMembers.splice(idxList[i], 1);
    await this.households.updateOne({ _id }, { members: newMembers });
  }

  async addVisit(_id: ObjectId) {
    const household = await this.getProfileById(_id);
    const newVisits = new Array<Date>();
    household.pastVisits.forEach((id) => {
      newVisits.push(id);
    });
    newVisits.push(new Date());
    await this.households.updateOne({ _id }, { pastVisits: newVisits });
  }

  async resetVisits(_id: ObjectId) {
    await this.getProfileById(_id);
    await this.households.updateOne({ _id }, { pastVisits: new Array<Date>() });
  }

  async countVisits(_id: ObjectId) {
    const household = await this.getProfileById(_id);
    return household.pastVisits.length;
  }

  async updateLanguage(_id: ObjectId, lang: string) {
    await this.getProfileById(_id);
    await this.households.updateOne({ _id }, { preferredLanguage: lang });
  }

  async updateRequests(_id: ObjectId, req: string) {
    await this.getProfileById(_id);
    await this.households.updateOne({ _id }, { specialRequests: req });
  }

  async addDietaryRestriction(_id: ObjectId, diet: string) {
    const household = await this.getProfileById(_id);
    household.dietaryRestrictions.forEach((id) => {
      if (id.valueOf() === diet.valueOf()) throw new BadValuesError("Dietary Restriction of household already exists!");
    });
    const newRestrictions = new Array<string>();
    household.dietaryRestrictions.forEach((id) => {
      newRestrictions.push(id);
    });
    newRestrictions.push(diet);
    await this.households.updateOne({ _id }, { dietaryRestrictions: newRestrictions });
  }

  async removeDietaryRestriction(_id: ObjectId, diet: string) {
    const household = await this.getProfileById(_id);
    const idxList = new Array<number>();
    household.dietaryRestrictions.forEach((id, idx) => {
      if (id.valueOf() === diet.valueOf()) idxList.push(idx);
    });
    const newRestrictions = new Array<string>();
    household.dietaryRestrictions.forEach((id) => {
      newRestrictions.push(id);
    });
    for (let i = idxList.length - 1; i >= 0; i--) newRestrictions.splice(idxList[i], 1);
    await this.households.updateOne({ _id }, { dietaryRestrictions: newRestrictions });
  }

  async updatestring(_id: ObjectId, diets: Array<string>) {
    await this.getProfileById(_id);
    await this.households.updateOne({ _id }, { dietaryRestrictions: diets });
  }

  async update(_id: ObjectId, update: Partial<HouseholdDoc>) {
    this.sanitizeUpdate(update);
    await this.households.updateOne({ _id }, update);
    return { msg: "Profile successfully updated!" };
  }

  async delete(_id: ObjectId) {
    await this.households.deleteOne({ _id });
    return { msg: "Succesfully deleted household profile" };
  }

  private sanitizeUpdate(update: Partial<HouseholdDoc>) {
    // update cannot change the organization or past visits
    const unallowedUpdates = ["organization", "pastVisits"];
    for (const key in update) {
      if (unallowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}
