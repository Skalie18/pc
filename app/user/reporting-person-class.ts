import { IReportingPerson } from './reporting-person-interface';
export class ReportingPersonClass implements IReportingPerson {

    UserReportingId?: String;
    Initials?: String;
    FirstNames?: String;
    Surname?: String;
    CellNumber?: String;
    HomeNumber?: String;
    BusinessNumber?: String;
    FaxNumber?: String;
    EmailAddress?: String;
    DateCreated?: String;
    CaseId?: String;
}
