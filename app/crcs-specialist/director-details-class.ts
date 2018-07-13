import { IDirectorDetailsInterface } from "app/crcs-specialist/director-details-interface";

export class DirectorDetailsClass implements IDirectorDetailsInterface {
    DirectorId: String;
    IBRCustumsNbr: string;
    CompanyNumber: String;
    Surname: String;
    FirstNames: String;
    IDNumber: String;
    DirectorType: String;
    DirectorStatus: String;
    DateCreated: String;
    RiskAssessmentId: String;
}
