import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

export interface IAuditorInterface {

    AuditPlanTemplateId: String;
    RiskAssementReport: boolean;
    VDDLQuestionId: String;
    AuditRequiredId: String;
    TypeOfAuditId: String;
    StartDate: Date;
    EndDate: Date;
    AuditScope: String;
    AuditObjectives?: String;
    IsTraderPreviouslyAudited: boolean;
    IsExistingAuditOrInvestigation: boolean;
    IsTraderNewExporterImporter: boolean;
    DateCreated: String;
    AuditPlanId: String;
    CaseId: String;
    Status: String;
}

export interface IAuditPlanResult {

    AuditTemplate: IAuditorInterface;
    AuditDocuments: Array<any>;
    CheckList: Array<any>[];
    CaseId: string;
    IsEdit: Boolean;
    PlanStage: string;
}

export interface ICheckList {
    CheckListId : string;
    Description: string;
    IsActive: boolean;
    SortOrder: number;
    DateCreated: string;
    CheckListTypeId: string;
    Answer: string;
    AuditPlanId: string;
    CheckListAnswerId:string;
    ChildMenuItems: Array<ICheckList>[];
    Expandable: boolean;
}