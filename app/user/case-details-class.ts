import { ICaseDetails, ISAR_CasePrioritisationInfo } from 'app/user/case-details-interface';
export class CaseDetailsClass implements ICaseDetails {

    StatusId: String;
    ReferenceNumber: String;
    NumTravellersIndividuals: number;
    NumEntityTypes: number;
    CaseDetailsId: String;
    CaseId: String;
    DateCreated: String;
    EntityTypeId: String;
    TravellerIndividualId: String;
    RegionId: String;
    IsEdit: boolean;
    Sid: String;
    IsPended: true;
    IsAllocationPulled: boolean;
    PulledBy: String;
    ReviewedBy: String;
    QaActionedBy: String;
    CustomsExciseId: String;
    ClientTypeId: String;
    Status: String;
}


export class SAR_CasePrioritisationInfo implements ISAR_CasePrioritisationInfo {

    ImportValue: string;
    ExportValue: string;
    ImportLines: string;
    ExportLines: string;
    RiskAreasIdentified: string;
    caseId: string;
}