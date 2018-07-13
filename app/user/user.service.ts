import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Iuser } from 'app/user/user-interface';

import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ISarInterface } from './sar-interface';
import { Globals } from '../globals';

@Injectable()
export class UserService {
  //get
  private getSarURL = "api/suspiciousactivityreport/getWIPSARForms?sid=";

  // post
  private saveSarURL = "api/suspiciousactivityreport/saveSARForm";
  private submitSarURL = "api/suspiciousactivityreport/submitSARForm";

  private acceptAnalysedUrl = "api/suspiciousactivityreport/acceptAnalysedSARForm";
  private discardSARFormUrl = "api/suspiciousactivityreport/discardSARForm";
  private qaDisagreeDiscardUrl = "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";
  private qaAcceptDiscardedUrl = "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";


  // lookup urls 
  // private getTravellerUrl = "api/LookUp/GETTravellerIndividual";
  // private getCompaniesUrl = "api/LookUp/GETEntityType";
  private getProvincesUrl = "api/LookUp/GETProvince";
  private getTimeFrameUrl = "api/LookUp/GETNonComplianceTimeFrame";
  private getYearlyLossUrl = "api/LookUp/GETPotentialYearlyLoss";
  private getRegionUrl = "api/LookUp/GETRegion";
  private getGetClientTypeUrl = "api/LookUp/GetClientType";

  private getInDethAnalysisUrl = "api/suspiciousactivityreport/getWIPSARForms?sid={sid}";
  private getPenedSarUrl = "api/suspiciousactivityreport/getPendedSARForms?sid={sid}";
  private getQaReviewerUrl = "api/suspiciousactivityreport/getQAReviewDiscardedSARForms?sid={sid}";
  private getCompleteRATemplatesUrl = "api/suspiciousactivityreport/GetCompleteRaTemplateCases?sid=";
  private getManageReview = "api/suspiciousactivityreport/getManagerReviewDiscardedSARForms?sid={sid}";
  // sar reviewer
  private acceptSARReviewUrl = "api/suspiciousactivityreport/acceptSARReview";
  private acceptSARAnalysisUrl = "api/suspiciousactivityreport/acceptAnalysedSARForm";
  private rejectSARReviewUrl = "api/suspiciousactivityreport/rejectSARReview";
  private closeReviewedSarCaseUrl = "api/suspiciousactivityreport/closeReviewedSarCase";

  // Quality Assurer 
  private qaAcceptDiscardedReviewUrl = "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";
  private qaAnalysisDisagreeDiscardSARFormUrl = "api/suspiciousactivityreport/DiscardSARForm";
  private qaDisagreeDiscardSARFormUrl = "api/suspiciousactivityreport/qaDissaproveDiscardedSARReview";

  private agreeSARAnalysisReviewUrl = "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";
  private disagreeSARAnalysisReviewUrl = "api/suspiciousactivityreport/qaDisagreeDiscardSARForm";



  constructor(private _http: Http, private systemUser: SystemUserProviderService, private globals: Globals) { }

  getSars(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getSarURL + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getCompleteRATemplates(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getCompleteRATemplatesUrl + this.systemUser.systemUserStorage.SID,
      { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getSarsByUser(user): Observable<any> {
    return this._http.get(this.globals.globalConStr + this.getSarURL + user, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getGetClientType(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getGetClientTypeUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }
  // getCompanies(): Observable<any[]> {
  //   return this._http.get(this._connServ.globalConStr + this.getCompaniesUrl, { withCredentials: true })
  //     .map((response: Response) => <any[]>response.json())

  //     .catch(this.handleError);
  // }
  getProvinces(): Observable<any[]> {

    let url = this.globals.globalConStr + this.getProvincesUrl
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }
  getTimeFrame(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getTimeFrameUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }
  getYearlyLoss(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getYearlyLossUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getRegion(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRegionUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  saveSar(newSar): Observable<any[]> {


    let body = JSON.stringify(newSar);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    //let body2 = this.serializeObj(body);

    return this._http.post(this.globals.globalConStr + this.saveSarURL, newSar, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitSar(sar): Observable<any[]> {

    let body = JSON.stringify(sar);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = this.globals.globalConStr + this.submitSarURL
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(url, sar, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  acceptSARReview(SARReview): Observable<any[]> {
    //let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.acceptSARReviewUrl, SARReview, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  acceptSARAnalysis(SARReview): Observable<any[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.acceptAnalysedUrl, SARReview, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  rejectSARReview(SARReview): Observable<any[]> {
    //let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.getUrlSarDiscardMapper(SARReview), SARReview, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  closeReviewedSarCase(ReviewedSarCase): Observable<any[]> {
    // let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.closeReviewedSarCaseUrl, ReviewedSarCase, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  qaDisagreeDiscardSARForm(qaDisagree): Observable<any[]> {
    // let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.getUrlSarDisagreeMapper(qaDisagree), qaDisagree, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  qaAcceptDiscardedReview(qaAccept): Observable<any[]> {
    // let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.qaAcceptDiscardedReviewUrl, qaAccept, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getUrlSarDiscardMapper(sarData) {
    if (sarData.SuspiciousActivityReportDetails.CaseDetails.Status == 'Allocated SAR: Pending in-depth analysis')
      return this.qaAnalysisDisagreeDiscardSARFormUrl;
    else
      return this.rejectSARReviewUrl;
  }

  getUrlSarDisagreeMapper(sarData) {
    if (sarData.Stage == 'Discarded SAR Case In-depth')
      return this.disagreeSARAnalysisReviewUrl;
    else if(sarData.Stage == 'Discarded SAR Case Review')
      return this.qaDisagreeDiscardSARFormUrl;
  }

  // geturlSarAgreeMapper(sarData) {
  //   if (sarData.SuspiciousActivityReportDetails.CaseDetails.Status == 'Discarded: Pending QA Review')
  //     return this.agreeSARAnalysisReviewUrl;
  //   else
  //     return this.qaDisagreeDiscardUrl;
  // }


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }



}
