import { IRiskAssessment } from "app/crcs-specialist/risk-assessment";

import { IRegistrationParticularsInterface } from 'app/crcs-specialist/registration-particulars-interface';
import { RegistrationParticularsClass } from "app/crcs-specialist/registration-particulars-class";
import { CustomsTurnOverDetailsClass } from "app/crcs-specialist/customs-turnover-details-class";
import { DirectorDetailsClass } from "app/crcs-specialist/director-details-class";
import { IRiskStatementInterface } from "./risk-statement-interface";
import { CustomsRASParticularsClass } from "./customs-particulars-class";
import { IDocumentInterface } from "../shared-modules/document-upload/document-interface";
import { IDirectorDetailsInterface } from "./director-details-interface";
import { ICustomsRASParticularsInterface } from "./customs-particulars-interface";
import { ICustomsTurnOverDetailsInterface } from "./customs-turnover-details-interface";
import { VddlallocationClass } from "../client-interface/vddlallocation-class";


export class RiskAssessmentClass implements IRiskAssessment  {
    constructor( ){}

    RegistrationParticulars: RegistrationParticularsClass = new RegistrationParticularsClass(); 
    CustomsRASParticulars: Array<ICustomsRASParticularsInterface> = [];
    CustomsTurnOverDetails: Array<ICustomsTurnOverDetailsInterface> = [];
    DirectorDetails: Array<IDirectorDetailsInterface> = [];
    RiskStatement:Array<IRiskStatementInterface> = [];
    CaseId: string;
    CaseRefNo:string;
    

}
 
export class RiskAssessmentReportCase {
    RiskAssessmentReportResult : RiskAssessmentClass = new RiskAssessmentClass();
    IsEdit:boolean;
    CaseNotes:Array<any>[];
    UploadedFiles: Array<any>[];
    RaAllocation: VddlallocationClass;
    Stage : any;
    AuditType: String;
}