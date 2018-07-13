export interface ICaseDetails {

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
    ClientTypeId
    Status: String;

}


export interface ISAR_CasePrioritisationInfo {
    ImportValue: string;
    ExportValue: string;
    ImportLines: string;
    ExportLines: string;
    RiskAreasIdentified: string;
    caseId: string;
}
