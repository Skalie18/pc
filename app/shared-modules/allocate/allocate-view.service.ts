import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { SystemUserProviderService } from '../../system-user-provider.service';

@Injectable()
export class AllocateViewService {
  sId:String;
  allocateReason :string 
  allocateDate :Date;
  constructor(private _http: Http, private systemUser:SystemUserProviderService) {
    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId =  this.systemUser.systemUserStorage.SID;

  }

  RejectAllocation(reason,date): Observable<any> {
    this.allocateReason = reason;
    this.allocateDate = date;
    var result = Observable.of("Rejected on " + this.allocateDate + ' Because: ' + this.allocateReason);
    return  result;
  }

  CancelAllocation(reason,date): Observable<any> {
    this.allocateReason = reason;
    this.allocateDate = date;
    var result=  Observable.of("Cancelled on " + this.allocateDate + ' Because: ' + this.allocateReason);
    return result;
  }
}
