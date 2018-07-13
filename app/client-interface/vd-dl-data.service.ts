import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IVddl } from './vd-dl-interface';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Globals } from '../globals';


@Injectable()
export class VdDlDataService implements OnInit {

  sId:String;
  connStr: String;
  private _vddlUrl =  "api/VDDLFeature/GetWIPVDDLForms?sid=";

  private _addVddlUrl = "api/vddlfeature/SaveVDDLForm";

  private _submitVddlUrl = "api/vddlfeature/SubmitVDDLForm";

  private _lookUporiginCaseUrl = "api/LookUp/GETOriginofCase";

  private _getCustomsExciseUrl= "api/LookUp/GETCustomsExcise";

  private _vddbyCaseUrl = "api/vddlfeature/getVddlFormByCaseId?caseId=";

  constructor(private _http: Http, private globals:Globals ) {
    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;
   }
  async ngOnInit() {
   
  }
  
  getvddls(): Observable<any[]> {     
    return this._http.get(this.globals.globalConStr + this._vddlUrl+this.globals.SID,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }
  
  getpendedvddls(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._vddlUrl+this.globals.SID+'&IsPended=true',{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }
  
  getvddlbycaseid(caseId):  Observable<IVddl> {
    return this._http.get(this.globals.globalConStr + this._vddbyCaseUrl+caseId,{withCredentials:true})
      .map((response: Response) => <IVddl>response.json())
      .catch(this.handleError);
  }

  getOriginoCase(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._lookUporiginCaseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError); 
  }

  getCustomsExcise(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this._getCustomsExciseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getVddlFormByCaseId(caseId): Observable<IVddl> {
    let url = this._vddbyCaseUrl+caseId
    return this._http.get(this.globals.globalConStr + url,{withCredentials:true})
      .map((response: Response) => <IVddl>response.json())
      .catch(this.handleError);
  }

  addVddl(newVddl: IVddl): Observable<IVddl[]> {
    let body = JSON.stringify(newVddl);    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,withCredentials:true });

    return this._http.post(this.globals.globalConStr + this._addVddlUrl, newVddl, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitVddl(submitVddl: IVddl): Observable<IVddl[]> {
    let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,withCredentials:true });

    return this._http.post(this.globals.globalConStr + this._submitVddlUrl, submitVddl, options)
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
}
