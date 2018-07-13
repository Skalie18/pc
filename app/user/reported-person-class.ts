import { IReportedPersonInterface } from "app/user/reported-person-interface";
import { LKPCountryCodes } from "../lookUp/lookup-interfaces";

export class ReportedPersonClass implements IReportedPersonInterface {

    Initials: String;
    FirstNames: String;
    Surname:String;
    DateOfBirth: String;
    IDNumber: String;
    PassportNumber: String
    CountryCodeObject : LKPCountryCodes = new LKPCountryCodes();
    PassportCountry: String = this.CountryCodeObject.CountryCode
    ReportedUserId?:String;
    ProvinceId:String;
    CaseId?: String;
    DateCreated: String;
    IsRemoved: boolean;   
}
