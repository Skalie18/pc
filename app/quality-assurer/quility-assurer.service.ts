import { Injectable } from '@angular/core';
import { SystemUserProviderService } from '../system-user-provider.service';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'
import { Globals } from '../globals';

@Injectable()
export class QuilityAssurerService {

  sId: String;
  
  constructor(private _http: Http, private globals: Globals, private systemUser: SystemUserProviderService) {

    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;
  
  }

  private getQaDiscardedReviewCasesUrl = "api/suspiciousactivityreport/GetQaDiscardedReviewCases?sid=";
  // private getNextCasePendingReviewUrl = "api/suspiciousactivityreport/getNextCasePendingReview?sid=";
  private getQAReviewDiscardedAnalysisFormsUrl ="api/suspiciousactivityreport/getQAReviewDiscardedAnalysisForms?sid="


  // getCasesPendingReview(): Observable<any[]> {
  //   return this._http.get(this._connServ.globalConStr + this.getCasesPendingReviewUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
  //     .map((response: Response) => <any[]>response.json())
  //     .catch(this.handleError);
  // }


  getQaDiscardedReviewCases(): Observable<any[]> {
    let url = this.globals.globalConStr + this.getQaDiscardedReviewCasesUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getQAReviewDiscardedAnalysisForms(): Observable<any[]> {
    let url = this.globals.globalConStr + this.getQAReviewDiscardedAnalysisFormsUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json()) 
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
