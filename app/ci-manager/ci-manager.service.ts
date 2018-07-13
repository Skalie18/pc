import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { IVddl } from 'app/client-interface/vd-dl-interface';
import { ICiManagerInterface } from 'app/ci-manager/ci-manager-interface';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';
import { debug } from 'util';
import { Globals } from '../globals';


@Injectable()
export class CiManagerService {

  constructor(private _http: Http, private systemUser: SystemUserProviderService, private globals:Globals) { }

  private getNextCasePendingUrl = "api/VDDLFeature/GetNextCasePendingAllocation?sid=";

  private getcheckPendAllocateGetNextUrl = "api/vddlfeature/checkPendAllocateGetNextCase?sid=";

  private getUsersUrl = "api/authentication/getAllUsers";

  private getRegionUrl = "api/LookUp/GETRegion";

  private allocateReallocateUrl = "api/vddlfeature/saveVDDLAllocation";

  private getCaseByRegionUrl = "api/vddlfeature/getNextCasePendingAllocationByRegion?sid=" + this.systemUser.systemUserStorage.SID + "&regionId=";

  private getAllocatedUrl = "api/vddlfeature/getAllocatedVDDLBySid?sid=";

  private getTrackAllocateUrl = "api/vddlfeature/trackAndAssignAllocate?filter=";

  private getTrackReallocateUrl = "api/vddlfeature/trackAndAssignReAllocate?sid=" + this.systemUser.systemUserStorage.SID + "&filter=";

  private getAllAuditPlansForApprovalUrl = "api/auditplan/getApprovalPlans?sid=";
  private getManagerAllocatedVDDLUrl = "api/vddlfeature/getManagerAllocatedVDDL?sid=" + this.systemUser.systemUserStorage.SID + "&auditType=";
  private getAllApprovedAuditPlansUrl = "api/auditplan/getApprovedPlans?sid=";
  private getAllApproveFindingsUrl = "api/auditplan/getApproveFindings?sid=";

  private getAllReworkFindingsUrl1 = "api/auditplan/getreworkAuditFindings?sid=";
  private getAllRejectedFindingsUrl1 = "api/auditplan/getrejectedAuditCases?sid=";

  private getAllLetterOfintentFindingsUrl1 = "api/auditplan/getApprovedIntents?sid=";
  private getAllLetterOfdemandFindingsUrl1 = "api/auditplan/getApprovedDemands?sid=";

  private getAllApprovedFindingsUrl1 = "api/auditplan/getApprovedFindings?sid=";
  private getApproveFindingLettersUrl = "api/auditplan/getApproveFindingLetters?sid=";

  private getAllPendingFindingsUrl = "api/auditplan/getPendingFindings?sid=";

  private getApproveDemandUrl = "api/auditplan/GetApprovedDemandLetters?sid=";
  private getFinalizedUrl = "api/auditplan/GetFinalisedCasesAuditor?sid=";

  private getClosedCiCasesAditorUrl = "api/auditplan/getClosedCiCasesAditor?sid=";
  private getCRCSManagerApprovedRejectedUrl = "api/auditplan/getCRCSManagerApprovedRejected?sid=";
  private getClosedCiCasesUrl = "api/auditplan/getCRCSManagerApprovedRejected?sid=";



  //Sar


  getNextCasePending(): Observable<IVddl[]> {
    return this._http.get(this.globals.globalConStr + this.getNextCasePendingUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <IVddl[]>response.json())
      .catch(this.handleError);
  }


  getcheckPendAllocateGetNext(): Observable<IVddl[]> {
    return this._http.get(this.globals.globalConStr + this.getcheckPendAllocateGetNextUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <IVddl[]>response.json())
      .catch(this.handleError);
  }

  getRegion(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRegionUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getUsers(): Observable<IUserAdminInterface[]> {
    return this._http.get(this.globals.globalConStr + this.getUsersUrl, { withCredentials: true })
      // .filter((response:Response) =><IUserAdminInterface>response.ManagerSID == this.systemUser.systemUserStorage.SID)  getCaseByRegionUrl
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllocated(): Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getAllocatedUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCaseByRegion(regionid): Observable<any[]> {
    let newUrl = this.globals.globalConStr + this.getCaseByRegionUrl + regionid
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getTrackAllocate(filter) {

    let newUrl = this.globals.globalConStr + this.getTrackAllocateUrl + filter;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  getTrackReallocate(filter) {
    let newUrl = this.globals.globalConStr + this.getTrackReallocateUrl + filter;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllAuditPlansForApproval() {
    let newUrl = this.globals.globalConStr + this.getAllAuditPlansForApprovalUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllApprovedAuditPlans() {
    let newUrl = this.globals.globalConStr + this.getAllApprovedAuditPlansUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllApprovedFindings() {
    let newUrl = this.globals.globalConStr + this.getAllApprovedFindingsUrl1 + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  getAllPendingFindings() {
    let newUrl = this.globals.globalConStr + this.getAllPendingFindingsUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllApprovedDemandFindings() {
    let newUrl = this.globals.globalConStr + this.getApproveDemandUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  getAllFinalizedFindings() {
    let newUrl = this.globals.globalConStr + this.getFinalizedUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getClosedCiCasesAditorCases() {
    let newUrl = this.globals.globalConStr + this.getClosedCiCasesAditorUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCRCSManagerApprovedRejected() {
    let newUrl = this.globals.globalConStr + this.getCRCSManagerApprovedRejectedUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  getClosedCiCases() {
    let newUrl = this.globals.globalConStr + this.getClosedCiCasesUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllFindingsRework() {
    let newUrl = this.globals.globalConStr + this.getAllReworkFindingsUrl1 + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllFindingsLetters() {
    let newUrl = this.globals.globalConStr + this.getApproveFindingLettersUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllFindingsLetterOfDemand() {
    let newUrl = this.globals.globalConStr + this.getAllLetterOfdemandFindingsUrl1 + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getAllFindingsRejected() {
    let newUrl = this.globals.globalConStr + this.getAllRejectedFindingsUrl1 + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getApprovalFindings() {
    let newUrl = this.globals.globalConStr + this.getAllApproveFindingsUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getManagerAllocatedVDDL(): Observable<any[]> {
    var audittype = 'Transactional/Demand Led Audits';
    let newUrl = this.globals.globalConStr + this.getManagerAllocatedVDDLUrl + audittype;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  allocateReallocate(allocateObj: ICiManagerInterface): Observable<ICiManagerInterface[]> {
    allocateObj.AuditType = 'Transactional/Demand Led Audits';
    let body = JSON.stringify(allocateObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.allocateReallocateUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }



}
