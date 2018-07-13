import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response } from '@angular/http';
import { SystemUserProviderService } from '../system-user-provider.service';
import { AuthenticationService } from 'app/shared-services/authentication.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Injectable()
export class DashboardDataService {  
  private DashboardApi = 'api/Dashboard/LoadDashboard?sid=';
  private ProgressDashboardUrl = 'api/Dashboard/LoadProgressboard?sid=';

  constructor(private _http:Http ,private systemUser:SystemUserProviderService, private globals:Globals, private _router:Router , private authService: AuthenticationService) { }

  testReady(): boolean {
    if(this.systemUser.systemUserStorage == undefined)
      return false;
    else 
      return true;
  }
  
  getDashBoard():Observable<any[]>{
    if(this.systemUser.systemUserStorage != undefined ) {
      let url = this.globals.globalConStr + this.DashboardApi;
      return this._http.get(url,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())      
      .catch(this.handleError);
      }
  }
  
  getMyDashBoard():Observable<any[]>{
    if(this.systemUser.systemUserStorage != undefined ) {
      let url = this.globals.globalConStr + this.DashboardApi+ this.globals.SID;
      return this._http.get(url,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())      
      .catch(this.handleError);
      }
  }

  getProgressDashBoard():Observable<any[]>{
    if(this.systemUser.systemUserStorage != undefined ) {
      let url = this.globals.globalConStr + this.ProgressDashboardUrl + this.globals.SID;
      return this._http.get(url,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())      
      .catch(this.handleError);
      }
  }
  
  getUserRole():String {
    if( this.systemUser != null )
      return this.systemUser.systemUserStorage.Role;
    else 
      return '';
  }

  // getUserSId():String {
  //   if( this.systemUser != null )
  //     return this.systemUser.systemUserStorage.SID;
  //   else 
  //     return '';
  // }
  // private getUsersLKP = "api/authentication/getAllUsers";
  // getUsers():Observable<any[]> {
  //   return this._http.get(this.globals.globalConStr + this.getUsersLKP,{withCredentials:true})        
  //     .map((response:Response) => <any[]>response.json())    
  //     .catch(this.handleError);
  // }

  // startUserImpersonation (SID)
  // {
  //   this.authService.getUserBySid(SID)
  //   .subscribe(res => {
  //       if(res instanceof Object){
  //         this.systemUser.systemUserStorage = res;   
          
  //         this._router.navigate(['/']);
  //       }else{
  //         this._router.navigate(['/errorpage']);
  //       }
  //     },
  //     error => this.errorMessage = <any>error);      
  // }
  // errorMessage:String;

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
