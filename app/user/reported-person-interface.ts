import { LKPCountryCodes } from "../lookUp/lookup-interfaces";

export class IReportedPersonInterface {
    Initials: String;
    FirstNames: String;
    Surname:String;
    DateOfBirth: String;
    IDNumber: String;
    PassportNumber: String;
    CountryCodeObject : LKPCountryCodes;
    PassportCountry: String;
    ReportedUserId?:String;
    ProvinceId:String;
    CaseId?: String;
    DateCreated: String;
    IsRemoved: boolean;
}
