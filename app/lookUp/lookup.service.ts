import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ISystemUserInterface } from 'app/system-user-interface';
import { Globals } from '../globals';

@Injectable()
export class LookUpService {

  private urlAuditRequiredLKP = 'api/LookUp/GetAuditRequired';
  private urlTypeOfAuditLKP = 'api/LookUp/GetTypeOfAudit';
  private urlVddlLKP = 'api/LookUp/GetVDDL';
  private urlClientNameLKP = "api/LookUp/GetClientName";
  private urlgetStatuses = "api/LookUp/GetStatus";
  private getUsersLKP = "api/authentication/getAllUsers";
  private getRegionLKP = "api/LookUp/GETRegion";
  private _getCustomsExciseUrl = "api/LookUp/GETCustomsExcise";
  private urlcountryCodes ="api/LookUp/GetCountryCodes";
  private urlprovinces = "api/lookUp/GetProvince";

  constructor(private _http: Http, private globals: Globals) { }


  getAuditRequiredLKP(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlAuditRequiredLKP, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  getTypeOfAuditLKP(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlTypeOfAuditLKP, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  getVddlLKP(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlVddlLKP, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getRegion(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getRegionLKP, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getUsers(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getUsersLKP, { withCredentials: true })
      // .filter((response:Response) =><IUserAdminInterface>response.ManagerSID == this.systemUser.systemUserStorage.SID)  getCaseByRegionUrl
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCustomsExcise(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._getCustomsExciseUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getClientNameLKP(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlClientNameLKP, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getStatuses(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlgetStatuses, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCountryCodes(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlcountryCodes, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getProvinces(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.urlprovinces, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }




  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}