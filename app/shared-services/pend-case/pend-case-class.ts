import { IPendCase } from "app/shared-services/pend-case/pend-case-interface";

export class PendCaseClass implements IPendCase {  
    PendedCaseId?:String ;
    Sid: String;
    DateCreated?:Date;
    EndDate?:Date;
    VoluntaryUnpendDate?:Date;
    CaseId:String;
    constructor() {}
}
