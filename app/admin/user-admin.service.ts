import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';
import { Globals } from '../globals';
import { IRoleAdminInterface } from './role-admin-interface';

@Injectable()
export class UserAdminService {

  private getAlluserUrl = "api/authentication/getAllUsers";
  private saveUserUrl = "api/authentication/saveUser";
  private getAllrolesUrl = "api/authentication/getAllSystemRoles";
  private getRegionUrl = "api/LookUp/GETRegion";
  private saveRoleUrl =  "api/authentication/saveRole";

  constructor(private _http:Http ,private systemUser:SystemUserProviderService, private globals:Globals ) { }


  getAlluser():Observable<any[]> {
      return this._http.get(this.globals.globalConStr + this.getAlluserUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
    
      .catch(this.handleError);

  }

  getAllroles():Observable<any[]> {
      return this._http.get(this.globals.globalConStr + this.getAllrolesUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())    
      .catch(this.handleError);
  }

  getRegion():Observable<any[]> {
      return this._http.get(this.globals.globalConStr + this.getRegionUrl,{withCredentials:true})
      .map((response:Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  
  saveUser(sar:IUserAdminInterface):Observable<IUserAdminInterface[]>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers,withCredentials:true });
      return this._http.post(this.globals.globalConStr + this.saveUserUrl,sar,options) 
                      .map((res:Response) => res.json()) 
                      .catch(this.handleError);     
  }

  saveRole(role:IRoleAdminInterface):Observable<IUserAdminInterface[]>{
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers,withCredentials:true });
      return this._http.post(this.globals.globalConStr + this.saveRoleUrl,role,options) 
                .map((res:Response) => res.json()) 
                .catch(this.handleError); 
  }
  
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
