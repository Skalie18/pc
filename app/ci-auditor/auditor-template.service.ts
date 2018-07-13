import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IAuditcheckListInterface } from './auditcheck-list-interface';
import { IAuditorInterface } from './auditor-interface';
import { AuditPlanResult } from './auditor-class';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';
import { Globals } from '../globals';

@Injectable()
export class AuditorTemplateService {

  constructor(private _http: Http, private systemUser: SystemUserProviderService, private globals:Globals ) { }

  private getAuditTemplateWIPUrl = "api/auditplan/getAuditTemplateWIPForms?sid=";
  private getCheckListAnswerUrl = "api/auditplan/getCheckListAnswer?auditplanId=";
  private getCheckListAnswerCaseIdUrl = "api/auditplan/getCheckListAnswer?caseId={caseId}";
  private getCompleteAuditPlanListUrl = "api/vddlfeature/getCompleteAuditPlanList?sid=";
  private getManagerAllocatedVDDLUrl = "api/vddlfeature/getManagerAllocatedVDDL?sid=";
  private getcompleteAuditPlanQuestionsUrl = "api/LookUp/GETCompleteAuditPlanQuestions";

  private saveCheckListAnswerUrl = "api/auditplan/saveCheckListAnswer";
  private saveAuditPlanUrl = "api/auditplan/saveAuditPlanTemplate";
  private submitAuditPlanUrl = "api/auditplan/submitAuditPlanReview";
  private saveCompletedAuditPlanAllinOneUrl = "api/auditplan/SaveAuditPlan";

  private getGenerateLetterUrl = "api/DocumentManagement/generateletter";
  private getAuditWorkInProgressPFormsUrl =  "api/auditplan/GetAuditWipForms?sid=";

  private saveReworkPlanUrl = "api/auditplan/reworkAuditPlan";
  private saveApprovedUrl =  "api/auditplan/ApproveAuditPlan";
  private saveRejectUrl =  "api/auditplan/rejectAuditPlan";


  private getApprovedAuditPlansUrl = "api/auditplan/getApprovedPlans?sid=";

  private saveExecuteReviewURL =  "api/auditplan/submitExecuteReview";
  private acceptFindsUrl = "api/auditplan/ApproveExecuteFindings";
  private rejectFindsUrl = "api/auditplan/RejectExecuteFindings";
  private rejectIntentFindsUrl = "api/auditplan/RejectIntentLetter";
  private rejectDemandFindsUrl = "api/auditplan/rejectDemandLetter";
  private reworkFindsUrl = "api/auditplan/ReworkExecuteFindings";
  private reworkLetterFindsUrl = "api/auditplan/reworkIntentLetter";
  private reworkDemandFindsUrl = "api/auditplan/reworkDemandLetter";
  private finalizeFindsUrl = "api/auditplan/FinaliseAuditPlan";
  private closeFindsUrl = "api/auditplan/CloseAuditPlan";

  private submitApproveIntentLettersUrl = "api/auditplan/submitIntentLetterReview";
  private submitApproveDemandLettersUrl = "api/auditplan/submitDemandLetterReview";

  private ApproveIntentLettersUrl = "api/auditplan/approveIntentLetter";
  private ApproveDemandLettersUrl = "api/auditplan/approveDemandLetter";

  private approveRejectionUrl = "api/auditplan/approveRejection";
  private disapproveRejectionUrl = "api/auditplan/updateDissaprovedCsManagerCases";
  

  getAuditTemplateWIP(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getAuditTemplateWIPUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl , { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCheckListAnswer(auditID : String): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getCheckListAnswerUrl + auditID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCheckListAnswerCaseId(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getCheckListAnswerCaseIdUrl;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getCompleteAuditPlanList(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getCompleteAuditPlanListUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getManagerAllocatedVDDL(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getManagerAllocatedVDDLUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getcompleteAuditPlanQuestions(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getcompleteAuditPlanQuestionsUrl;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getDocumentGenerationLetter(document : IDocumentInterface) : Observable<any> {
    var newUrl = this.globals.globalConStr + this.getGenerateLetterUrl;
    return this._http.post(newUrl, document, { withCredentials: true })
    .map((response: Response) => <any[]>response.json())

    .catch(this.handleError);
  }

  getAuditWorkInProgressPForms(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getAuditWorkInProgressPFormsUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getAuditReworkPForms(): Observable<any[]> {
    return this._http.get(this.getAuditWorkInProgressPFormsUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  

  getApprovedAuditPlans(): Observable<any[]> {
    var newUrl = this.globals.globalConStr + this.getApprovedAuditPlansUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
    .map((response: Response) => <any[]>response.json())

    .catch(this.handleError);

  }


  saveCheckListAnswer(CheckList : Array<any>[]): Observable<any[]> {
    let body = JSON.stringify(CheckList);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveCheckListAnswerUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  saveAuditPlan(AuditPlan: IAuditorInterface): Observable<any[]> {

    let body = JSON.stringify(AuditPlan);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveAuditPlanUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitAuditPlan(AuditPlan: AuditPlanResult): Observable<any[]> {

    let body = JSON.stringify(AuditPlan);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.submitAuditPlanUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  saveCompleteAuditPlanAllInOne(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveCompletedAuditPlanAllinOneUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  submitReworkPlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveReworkPlanUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitApprovePlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = JSON.stringify(auditPlanResult);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveApprovedUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  
  submitRejectPlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveRejectUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }



  // Execute findings 

  submitExecuteReview(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.saveExecuteReviewURL;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  acceptFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.acceptFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  rejectFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {
   

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.rejectFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  rejectIntentLetterFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {
   

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.rejectIntentFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  rejectDemandLetterFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {
   

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.rejectDemandFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  ApproveIntentLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.ApproveIntentLettersUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  
  
  ApproveDemandLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    var newUrl = this.globals.globalConStr + this.ApproveDemandLettersUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

    
  SubmitApproveDemandLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    var newUrl = this.globals.globalConStr + this.submitApproveDemandLettersUrl;
    return this._http.post(newUrl , body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  SubmitApproveIntentLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.submitApproveIntentLettersUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  


  reworkFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.reworkFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  reworkLetterIntentFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.reworkLetterFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  reworkDemandLetterFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.reworkDemandFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  finalizeFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.finalizeFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  closeFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.closeFindsUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  approveRejection(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.approveRejectionUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }



  disapproveRejection(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var newUrl = this.globals.globalConStr + this.disapproveRejectionUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
