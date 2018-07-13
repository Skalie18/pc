import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IRiskAssessment } from './risk-assessment';
import { SystemUserProviderService } from '../system-user-provider.service';
import { RiskAssessmentReportCase } from './risk-assessment-class';
import { SarClass } from '../user/sar-class';
import { Globals } from '../globals';

@Injectable()
export class RiskAssessmentService {

  sId:String;
  
  private _riskAssmentUrl = "api/riskassessmentreport/GetRiskAssessmentWIPForms?sid=";

  private _managerApprovalriskAssmentUrl = "api/riskassessmentreport/getManagerApprovalRiskAssessmentForms?sid=";

  private _riskassessmentReworkUrl = "api/riskassessmentreport/GetReworkRaForms?sid=";

  private _riskassessmentReworkSubmitUrl = "api/riskassessmentreport/submitRiskAssessmentReport";

  private _managerApprovedriskAssmentUrl = "api/riskassessmentreport/GetApprovedRaForms?sid=";
  
  private _addriskAssmentUrl = "api/riskassessmentreport/saveRiskAssessmentReport";

  private _submitriskAssmentUrl = "api/riskassessmentreport/submitRiskAssessmentReport";

  private _lookUporiginCaseUrl ="api/LookUp/GETOriginofCase";

  private getRiskAreaUrl = "api/LookUp/GETRiskArea";

  private getRiskRatingsLikelihoodUrl = "api/LookUp/GETRiskRatingLikelihood";

  private getRiskRatingsConcernedUrl = "api/LookUp/GETRiskRatingConcerned";
  
  private getHSChapterAppliedTUrl = "api/LookUp/GETHSChapterAppliedTo";

  private getIndustryUrl = "api/LookUp/GETIndustry";

  private _approveUrl =  "api/riskassessmentreport/approveRiskAssessmentReport";

  private _reworkUrl = "api/riskassessmentreport/reworkRiskAssessmentReport";

  private _rejectUrl =  "api/riskassessmentreport/rejectRiskAssessmentReport";

  private _qaAllocationUrl =  "api/suspiciousactivityreport/saveSARAllocation";
  
  private _getRAbyIBRNumberUrl = "api/riskassessmentreport/getRiskAssessmentFormsByIbrNumber?ibrNumber=";
  private _getRAbyCaseNumberUrl = "api/riskassessmentreport/GetRaFormByCaseId?caseId=";
  
  private getNextRAAllocationUrl = "api/riskassessmentreport/getNextToAllocate?sid="+this.systemUser.systemUserStorage.SID+"&auditType=";
  private getNextRAAllocationByRegionUrl = "api/riskassessmentreport/getNextToAllocateByRegion?sid="+this.systemUser.systemUserStorage.SID+"&regionId=";
  private _riskAssmentGetManagerAllocatedRaUrl = "api/riskassessmentreport/GetManagerAllocatedRa?sid="+this.systemUser.systemUserStorage.SID+"&auditType=";
  private _riskAssmentCheckPendAllocateGetNextCaseUrl = "api/riskassessmentreport/CheckPendAllocateGetNextCase?sid="+this.systemUser.systemUserStorage.SID+"&auditType=";
  private _riskAssmentgetTrackAllocateUrl = "api/riskassessmentreport/TrackAndAssignAllocate?filter=";
  private _riskAssmentgetTrackAndAssignReAllocateUrl = 'api/riskassessmentreport/TrackAndAssignReAllocate?sid='+this.systemUser.systemUserStorage.SID+"&filter=";
  private _riskAssmentSaveRaAllocationUrl =  "api/riskassessmentreport/saveRaAllocation";
  


  RA_Fields: Boolean;
  RA_Approval: Boolean;
  Approval_Status: String;


  constructor(private _http: Http,private globals:Globals  ,private systemUser:SystemUserProviderService) {

    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;
   }

  

  rejectAssment(rejectRiskAssment: RiskAssessmentReportCase): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});
      
    return this._http.post(this.globals.globalConStr + this._rejectUrl, rejectRiskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  qaAllocation(sarObject: SarClass): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});
      
    return this._http.post(this.globals.globalConStr + this._qaAllocationUrl, sarObject , options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  
  reworkAssment(reworkRiskAssment: RiskAssessmentReportCase): Observable<any[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});

    return this._http.post(this.globals.globalConStr + this._reworkUrl, reworkRiskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
       
  approveAssment(approvalAssment: RiskAssessmentReportCase): Observable<any[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});

    return this._http.post(this.globals.globalConStr + this._approveUrl, approvalAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
    
  getRAbyIBRNumber(IBRNumber): Observable<RiskAssessmentReportCase> {
    let url = this.globals.globalConStr + this._getRAbyIBRNumberUrl + IBRNumber;
    return this._http.get(url,{withCredentials:true})
      .map((response: Response) => <RiskAssessmentReportCase>response.json())

      .catch(this.handleError);
  }

  getRAFormByCaseId(caseId): any {
    let url = this.globals.globalConStr + this._getRAbyCaseNumberUrl + caseId;
    return this._http.get(url,{withCredentials:true})
      .map((response: Response) => <RiskAssessmentReportCase>response.json())

      .catch(this.handleError);
  }

  getriskAssments(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._riskAssmentUrl+this.systemUser.systemUserStorage.SID,{withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  getreworkriskAssments(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._riskassessmentReworkUrl+this.systemUser.systemUserStorage.SID,{withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  

  getApprovalRiskAssessmentForms(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._managerApprovalriskAssmentUrl+this.systemUser.systemUserStorage.SID,
      {withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getApprovedRiskAssessmentForms(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._managerApprovedriskAssmentUrl+this.systemUser.systemUserStorage.SID,
      {withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getTechnicalReviewRiskAssessmentForms(type:any): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getTechnicalReviewuri(type),
      {withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getOriginoCase(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._lookUporiginCaseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  addRADocs(newRA: any): Observable<any[]> {
    let body = JSON.stringify(newRA);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,withCredentials:true });

    return this._http.post(this.globals.globalConStr + this._addriskAssmentUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  addriskAssment(newriskAssment: any): Observable<any[]> {

    let body = JSON.stringify(newriskAssment);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this._addriskAssmentUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getRiskArea():Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRiskAreaUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getRiskRatingsLikelihood():Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRiskRatingsLikelihoodUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())    
    .catch(this.handleError);
  }


  getRiskRatingsConcerned():Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRiskRatingsConcernedUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())    
    .catch(this.handleError);
  }

  getHSChapterApplied():Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getHSChapterAppliedTUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())    
    .catch(this.handleError);
  }
  
  getIndustry():Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getIndustryUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())    
    .catch(this.handleError);
  }


  submitriskAssment(submitriskAssment: RiskAssessmentReportCase): Observable<any[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this._submitriskAssmentUrl, submitriskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  reworksubmitriskAssment(submitriskAssment: RiskAssessmentReportCase): Observable<any[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this._riskassessmentReworkSubmitUrl, submitriskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  getNextRAAllocationByRegion(region: any, auditType: any):Observable<any[]> {
    return this._http.get(this.globals.globalConStr + 
                          this.getNextRAAllocationByRegionUrl + region + '&auditType=' + auditType,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    .catch(this.handleError);
  }

  getNextRAAllocation(auditType: any):Observable<any[]> {
    return this._http.get(this.globals.globalConStr + 
                          this.getNextRAAllocationUrl + auditType ,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    .catch(this.handleError);
  }

  GetManagerAllocatedRa(auditType: any) :Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._riskAssmentGetManagerAllocatedRaUrl+auditType,
      {withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getcheckPendAllocateGetNext(auditType: any): any {
    return this._http.get(this.globals.globalConStr + this._riskAssmentCheckPendAllocateGetNextCaseUrl+auditType,
      {withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getTrackAllocate(filter, auditType){

    let newUrl = this.globals.globalConStr + this.getRATrackAndAssignuri(filter, auditType);
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())    
      .catch(this.handleError);
  }

  getTrackReallocate(filter){
    let newUrl = this.globals.globalConStr + this._riskAssmentgetTrackAndAssignReAllocateUrl+filter;
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  saveRAllocation(raAssessment: any) : Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this._riskAssmentSaveRaAllocationUrl, raAssessment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getTechnicalReviewuri(type){
    var urlString = "api/riskassessmentreport/" + type + "?sid="+this.systemUser.systemUserStorage.SID
    return urlString;
  }

  getTechnicalReviewposturi(type){
    var urlString = "api/riskassessmentreport/" + type;
    return urlString;
  }

  getRATrackAndAssignuri(filter, audittype)
  {
    var urlString = "api/riskassessmentreport/TrackAndAssignAllocate?filter=" + filter + "&auditType=" + audittype;
    return urlString;
  }

  technicalReviewAction(riskAssessment: RiskAssessmentReportCase, type : any): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this.getTechnicalReviewposturi(type), riskAssessment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

}
