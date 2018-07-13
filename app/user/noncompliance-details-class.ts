import { INoncomplianceDetailsInterface } from './noncompliance-details-interface';
export class NoncomplianceDetailsClass implements INoncomplianceDetailsInterface {

   
    NonComplianceId?: String;
    DescribeNonCompliance: String;
    NonComplianceLocation: String;
    NonComplianceOccurance: String;
    AdditionalInfo: String;
    TimeFrameId: String;
    YearlyLossId: String;
    DateCreated?: Date
    CaseId: String;
    RiskAreasIdentified:number;
    IsRemoved: boolean;
    LicensingAndRegistration?: boolean;
    Submission?: boolean;
    Declaration?: boolean;
    Payments?: boolean;
    IllegalActivities?: boolean;
    Other?: boolean;
}
