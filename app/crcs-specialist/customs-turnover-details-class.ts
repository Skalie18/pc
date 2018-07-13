import { ICustomsTurnOverDetailsInterface } from "app/crcs-specialist/customs-turnover-details-interface";

export class CustomsTurnOverDetailsClass implements ICustomsTurnOverDetailsInterface {
    TurnOverId: String;
    IBRCustumsNbr: string;
    ReferenceNumber: String;
    CalendarYear: String;
    ImportLines: String;
    ImportValue: Number;
    ImportDuty: Number;
    ImportVAT: Number;
    ExportLines: String;
    ExportValue: String;
    DateCreated: String;
    RiskAssessmentId: String;
}
