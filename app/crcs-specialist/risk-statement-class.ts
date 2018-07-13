import { IRiskStatementInterface } from "./risk-statement-interface";

export class RiskStatementClass implements IRiskStatementInterface {

    RiskStatementId: String;
    IBRCustumsNbr: string;
    RiskAreaId: String;
    NumberOfRiskPerRiskArea: String;
    Recommendations: String;
    RiskRatingLikelihoodId: String;
    RiskRatingConcernedId: String;
    OveralRiskRating: String;
    HSChapterAppliedToId: String;
    EstimatedRevenueAtRisk: String;
    RiskDescription: String;
    IndustryId: String;
    DateCreated: String;
    RiskAssessmentId: String;
    StatusId: String;
    AuditRiskArea: Boolean;
    IsIntegratedAuditRequired: Boolean;
    IsRelateToSarsComplianceOrCustomsFocusArea: Boolean;
    AuditFindings: String;
    Status: String;
    IsRemoved : Boolean;
    RiskAreaComment: string;
    
}
