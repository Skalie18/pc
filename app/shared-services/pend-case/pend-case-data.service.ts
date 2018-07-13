import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IPendCase } from "app/shared-services/pend-case/pend-case-interface";
import { PendCaseClass } from "app/shared-services/pend-case/pend-case-class";
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Globals } from '../../globals';

@Injectable()
export class PendCaseDataService {
  sId:String;
  errorMessage: string ;  
  private _pendCaseUrl ="api/Common/savePendedCase";
  private _unpendCaseUrl ="api/Common/saveUnPendedCase";
  constructor(private _http: Http, private globals:Globals, private systemUser:SystemUserProviderService) { 
    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;  
  }

  submitPend(submitPend: IPendCase):  Observable<any[]> {
    let body = JSON.stringify(submitPend); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,withCredentials:true });

    return this._http.post(this.globals.globalConStr + this._pendCaseUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  onPendCase (caseId:String, pendDate:Date ):any{  
    let pendCase = new PendCaseClass();
    pendCase.CaseId = caseId;
    pendCase.Sid = this.systemUser.systemUserStorage.SID;
    pendCase.EndDate = new Date(pendDate);
    return this.submitPend(pendCase)
        .subscribe(
          results => {
            if(results != null){
                return <any>results;         
            }else{
              return ("Case did not pend " + pendCase.CaseId);
            }
        }),
        error => this.errorMessage = <any>error
  };
  
  onUnPendCase (caseId:String ):any{  
    let pendCase = new PendCaseClass();
    pendCase.CaseId = caseId;
    pendCase.Sid = this.systemUser.systemUserStorage.SID;
    return this.submitUnPend(pendCase)
        .subscribe(
          results => {
            if(results != null){
                return <any>results;         
            }else{
              return ("Case did not pend " + pendCase.CaseId);
            }
        }),
        error => this.errorMessage = <any>error
  };

  submitUnPend(submitPend: IPendCase):  Observable<any[]> {
    let body = JSON.stringify(submitPend); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,withCredentials:true });

    return this._http.post(this.globals.globalConStr + this._unpendCaseUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}