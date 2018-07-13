
import { IAuditorInterface, IAuditPlanResult, ICheckList } from './auditor-interface';
import { Audit_CIAuditorFindings, AuditFindingsResult } from './auditFinding';
export class AuditorClass   implements IAuditorInterface {

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
    DateCreated: string;
    AuditPlanId: string;
    CaseId: String;
    Status: String;
}

export class AuditPlanResult implements IAuditPlanResult {
    AuditTemplate: AuditorClass;
    AuditDocuments: Array<any>;
    CheckList: any[][];
    AuditFindingsResult : AuditFindingsResult
    CaseId: string;
    IsEdit: Boolean;
    PlanStage: string;
}

export class CheckList implements ICheckList {
    CheckListId: string;
    Description: string;
    IsActive: boolean;
    SortOrder: number;
    DateCreated: string;
    CheckListTypeId: string;
    Answer: string;
    AuditPlanId: string;
    CheckListAnswerId: string;
    ChildMenuItems: Array<ICheckList>[];
    Expandable: boolean;
}

