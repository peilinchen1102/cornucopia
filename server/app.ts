import HouseholdConcept from "./concepts/household";
import LanguageAudioConcept from "./concepts/languageaudio";
import MembershipConcept from "./concepts/membership";
import PatronConcept from "./concepts/patron";
import ShiftConcept from "./concepts/shift";
import StockConcept from "./concepts/stock";
import TeamConcept from "./concepts/team";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Membership = new MembershipConcept();
export const Team = new TeamConcept();
export const Stock = new StockConcept();
export const Household = new HouseholdConcept();
export const Patron = new PatronConcept();
export const Shift = new ShiftConcept();
export const LanguageAudio = new LanguageAudioConcept();
