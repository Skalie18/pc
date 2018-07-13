import { Injectable } from '@angular/core';
import { SystemUserProviderService } from '../system-user-provider.service';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Globals } from '../globals';

@Injectable()
export class SarAllocationService {

  sId: String;
  connStr: String;
  constructor(private _http: Http, private globals: Globals, private systemUser: SystemUserProviderService) { 

    this.connStr = this.globals.globalConStr;
  }

  private getTrackAllocateUrl = "api/suspiciousactivityreport/trackAndAssignAllocate?filter=";
  private getTrackReallocateUrl ="api/suspiciousactivityreport/trackAndAssignReAllocate?sid="+this.systemUser.systemUserStorage.SID+"&filter=";

  private getNextSarAllocationUrl = "api/suspiciousactivityreport/getNextSarAllocation?sid=";
  private getpulledByuserUrl = "api/suspiciousactivityreport/checkPendAllocateGetNextCase?sid=";
  private getAllocatedCasesIndepthUrl = "api/suspiciousactivityreport/GetInDepthAnalysisSARForms?sid=";
  private getAllocatedCasesUrl = "api/suspiciousactivityreport/getAllocatedCasesBySid?sid=";
  private getNextSarAllocationByRegionUrl = "api/suspiciousactivityreport/getNextSarAllocationByRegion?sid="+this.systemUser.systemUserStorage.SID+"&regionId=";
  private getQACaseAllocationUrl = "api/suspiciousactivityreport/getSarCaseByCaseId?caseId=";

  private saveSARAllocationUrl = "api/suspiciousactivityreport/saveSARAllocation";
  private getPendingCasesIndepthUrl = "api/suspiciousactivityreport/getPendedSarCases?sid=";
  
  
  getNextSarAllocation(): Observable<any[]> {
    let url = this.globals.globalConStr + this.getNextSarAllocationUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getPulledByUseCases(): Observable<any[]> {
    let url = this.globals.globalConStr + this.getpulledByuserUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  getNextSarAllocationByRegion(regionid):Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getNextSarAllocationByRegionUrl+regionid
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllocatedCases():Observable<any[]> {
    let url = this.globals.globalConStr + this.getAllocatedCasesUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getQACaseById(sarcaseId : any): Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getQACaseAllocationUrl+sarcaseId
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getIndepthAllocatedCases(): any {
    let url = this.globals.globalConStr + this.getAllocatedCasesIndepthUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getPendingCases(): any {
    let url = this.globals.globalConStr + this.getPendingCasesIndepthUrl + this.systemUser.systemUserStorage.SID
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  saveSARAllocation(allocateSar):Observable<any[]>{
    let body = JSON.stringify(allocateSar);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.post(this.globals.globalConStr + this.saveSARAllocationUrl,body,options) 
        .map((res:Response) => res.json())
        .catch(this.handleError); 
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  getTrackAllocate(trackValue: any):Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getTrackAllocateUrl+trackValue;
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())    
      .catch(this.handleError);
  }

  getTrackReallocate(trackValue: any):Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getTrackReallocateUrl+trackValue;
    return this._http.get(newUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
      .catch(this.handleError);
  }


}
