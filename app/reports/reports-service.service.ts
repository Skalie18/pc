import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';
import { ReportResult } from './reportcriteria';
import { Globals } from '../globals';

@Injectable()
export class ReportsServiceService {

  private getReportDataURL = "api/report/getReportData";
  private getreportsUrl = "api/report/getReports";

  constructor(private _http: Http, private systemUser: SystemUserProviderService, private globals: Globals) { }


  getreportData(reportCriteria: ReportResult): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.globals.globalConStr + this.getReportDataURL, reportCriteria, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);

  }

  getreports(): Observable<any[]> {
    return this._http.get(this.globals.globalConStr + this.getreportsUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
