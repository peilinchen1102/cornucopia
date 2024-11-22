import { ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotAllowedError, NotFoundError } from "./errors";

export interface TeamDoc extends BaseDoc {
  name: string;
  admins: Array<ObjectId>;
  members: Array<ObjectId>;
  openDays: Array<number>;
  restockDay: number;
}

export default class TeamConcept {
  public readonly teams = new DocCollection<TeamDoc>("teams");

  async create(name: string, founder: ObjectId) {
    const admins: Array<ObjectId> = [founder];
    const members: Array<ObjectId> = [];
    const openDays = [1, 2, 3, 4, 5];
    if (!name) {
      throw new BadValuesError("Missing Organization Name");
    }
    const restockDay = 0;
    await this.isTeamNameUnique(name);
    const _id = await this.teams.createOne({ name, admins, members, openDays, restockDay });
    return { msg: "Team successfully created!", team: await this.teams.readOne({ _id }) };
  }

  async get(_id: ObjectId) {
    const team = await this.teams.readOne({ _id });
    if (!team) {
      throw new NotFoundError("Team Not Found");
    }
    return team;
  }
  private async isTeamNameUnique(name: string) {
    const exists = await this.teams.readOne({ name });
    if (exists) {
      throw new NotAllowedError(`Team with team name ${name} already exists!`);
    }
  }

  async isAdmin(_id: ObjectId, editor: ObjectId) {
    const team = await this.get(_id);
    if (!team) {
      throw new NotFoundError("Team Not Found");
    }
    if (!team.admins.some((member) => member.toString() === editor.toString())) {
      throw new NotAllowedError("Non Admins Cannot Edit Team");
    }
    return team;
  }

  async isTeamMember(_id: ObjectId, user: ObjectId) {
    const team = await this.get(_id);
    if (!team) {
      throw new NotFoundError("Team Not Found");
    }
    if (!(team.admins.some((member) => member.toString() === user.toString()) || team.members.some((member) => member.toString() === user.toString()))) {
      throw new NotAllowedError(`${user} is not a member of organization ${_id}!`);
    }
  }

  async updateName(_id: ObjectId, name: string, editor: ObjectId) {
    await this.isAdmin(_id, editor);
    await this.teams.updateOne({ _id }, { name });
    return { msg: "Successfully Updated Team Name" };
  }

  async updateOpenDays(_id: ObjectId, days: Array<number>, editor: ObjectId) {
    await this.isAdmin(_id, editor);
    await this.teams.updateOne({ _id }, { openDays: days });
    return { msg: "Successfully Updated Team OpenDays" };
  }

  async updateRestockDay(_id: ObjectId, day: number, editor: ObjectId) {
    await this.isAdmin(_id, editor);
    await this.teams.updateOne({ _id }, { restockDay: day });
    return { msg: "Successfully Updated Team RestockDay" };
  }

  async removeUsersFromTeam(_id: ObjectId, exMembers: Array<ObjectId>, editor: ObjectId) {
    let oldTeam;
    const memberIds = new Set(exMembers.map((member) => member.toString()));
    if (exMembers.length === 1 && memberIds.has(editor.toString())) {
      oldTeam = await this.get(_id);
    } else {
      oldTeam = await this.isAdmin(_id, editor);
    }
    const members = oldTeam.members.filter((member) => !memberIds.has(member.toString()));
    const admins = oldTeam.admins.filter((member) => !memberIds.has(member.toString()));
    if (admins.length === 0) {
      throw new NotAllowedError("Organization must have at least one admin");
    }
    await this.teams.updateOne({ _id }, { members, admins });
    return { msg: "Successfully Removed User From Team" };
  }

  async addUsersAsMembers(_id: ObjectId, newMembers: Array<ObjectId>, editor: ObjectId) {
    await this.removeUsersFromTeam(_id, newMembers, editor);
    const oldTeam = await this.isAdmin(_id, editor);
    const uniqueMembers = new Set([...oldTeam.members.map((user) => user.toString()), ...newMembers.map((user) => user.toString())]);
    const members = [...uniqueMembers].map((member) => new ObjectId(member));
    await this.teams.updateOne({ _id }, { members });
    return { msg: "Successfully Added New Member to Team!" };
  }

  async addUsersAsAdmins(_id: ObjectId, newMembers: Array<ObjectId>, editor: ObjectId) {
    await this.removeUsersFromTeam(_id, newMembers, editor);
    const oldTeam = await this.isAdmin(_id, editor);
    const uniqueMembers = new Set([...oldTeam.admins.map((user) => user.toString()), ...newMembers.map((user) => user.toString())]);
    const admins = [...uniqueMembers].map((member) => new ObjectId(member));
    await this.teams.updateOne({ _id }, { admins });
    return { msg: "Successfully Added New Member to Team!" };
  }

  async delete(_id: ObjectId, editor: ObjectId) {
    await this.isAdmin(_id, editor);
    await this.teams.deleteOne({ _id });
    return { msg: "Team is Successfully Deleted!" };
  }

  async idsToNames(ids: ObjectId[]) {
    const teams = await this.teams.readMany({ _id: { $in: ids } });

    // Store strings in Map because ObjectId comparison by reference is wrong
    const idToTeam = new Map(teams.map((t) => [t._id.toString(), t]));
    return ids.map((id) => idToTeam.get(id.toString())?.name ?? "DELETED_USER");
  }
}
