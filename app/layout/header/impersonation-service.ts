import { Component, Input ,Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from '../../shared-services/authentication.service';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { Globals } from '../../globals';
import { Router } from '@angular/router';



@Injectable() 
export class ImpersonationService{
  errorMessage:string;
  private getUsersLKP = "api/authentication/getAllUsers";

  constructor(private http: Http,private _router:Router, private authService:AuthenticationService, private systemUser: SystemUserProviderService, private globals:Globals){}
 
  loadImpersonatedUser(){
     this.authService.getUserBySid(this.globals.SID)
     .subscribe(res => {
        if(res instanceof Object){
          this.systemUser.systemUserStorage = res;
          if (this.systemUser.systemUserStorage != null) {
            this.globals.userRole = this.systemUser.systemUserStorage.Role;             
            this.globals.SID = this.systemUser.systemUserStorage.SID;
            this.globals.name = this.systemUser.systemUserStorage.FirstName;
            this.globals.Surname = this.systemUser.systemUserStorage.LastName;
            this.globals.RegionName = this.systemUser.systemUserStorage.RegionName;          
          }
      }
    },
    error => this.errorMessage = <any>error);        
  }

  startUserImpersonation (SID)
  {
    this.authService.getUserBySid(SID)
    .subscribe(res => {
        if(res instanceof Object){
          this.systemUser.systemUserStorage = res;   
          
          this._router.navigate(['/']);
        }else{
          this._router.navigate(['/errorpage']);
        }
      },
      error => this.errorMessage = <any>error);      
  }
  getUserSId():String {
    if( this.systemUser != null )
      return this.systemUser.systemUserStorage.SID;
    else 
      return '';
  }
  getUsers():Observable<any[]> {
    return this.http.get(this.globals.globalConStr + this.getUsersLKP,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())    
      .catch(this.handleError);
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}