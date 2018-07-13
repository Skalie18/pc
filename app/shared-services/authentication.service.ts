import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ISystemUserInterface } from 'app/system-user-interface';
import { Globals } from '../globals';


const MY_MAIN_URL:string = "http://ptaqaiis03:90/PCA_WEBAPI/";
@Injectable()
export class AuthenticationService {

  private getLoggedInUserUrl = "api/authentication/GetAuthenticatedUser";
  private getloggedUserBySid = "api/authentication/getUserBySid?sid=";
            
  constructor(private _http: Http, private globals:Globals) { }

  getLoggedInUser(): Observable<any> {    
    let constr = this.globals.globalConStr;
    // if (constr == undefined) {
    //   constr = 'http://localhost:4890';
    // }
    return this._http.post(constr + this.getLoggedInUserUrl,"Give me the user" ,{ withCredentials: true })
      .map((response: Response) => <any>response.json())

      .catch(this.handleError);
  }

  getUserBySid(Sid): Observable<any> {    
    let url = this.globals.globalConStr + this.getloggedUserBySid+Sid;
    return this._http.get(url,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())      
    .catch(this.handleError);      
  }



  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }






}
