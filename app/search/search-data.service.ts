import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IVddl } from 'app/client-interface/vd-dl-interface';
import { ISearch } from 'app/search/search-interface';
import { SearchClass } from 'app/search/search-class';
import { SystemUserProviderService } from '../system-user-provider.service';
import { Globals } from '../globals';
import { SearchParamsClass } from './searchParams-class';

@Injectable()
export class SearchDataService {
  sId: String;
  private _searchUrl = 'api/Common/SearchCasesByParam';
  private _caseHistoryURL = 'api/Common/GetCaseHistory?CaseId=';
  private _formType = 'api/LookUp/GetFormType';

  constructor(
    private _http: Http,
    private globals: Globals,
    private systemUser: SystemUserProviderService
  ) {
    // let user = localStorage.getItem("User");
    // let userJson = JSON.parse(user);
    // this.sId = userJson.SID;
  }

  getSearchData(
    searchParams: SearchParamsClass,
    allUsers: boolean
  ): Observable<any[]> {
    if (!allUsers) {
      searchParams.Sid = this.systemUser.systemUserStorage.SID.toString();
    } else {
      searchParams.Sid = '';
    }
    // ?SearchParams=
    const body = JSON.stringify(searchParams);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const newUrl = this.globals.globalConStr + this._searchUrl;
    return this._http.post(newUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getData(): Observable<any[]> {
    return this._http
      .get(
        this.globals.globalConStr +
          this._searchUrl +
          this.systemUser.systemUserStorage.SID,
        { withCredentials: true }
      )
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getSearchType(): Observable<any[]> {
    return this._http
      .get(this.globals.globalConStr + this._formType, {
        withCredentials: true
      })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getCaseHistory(caseId): Observable<any[]> {
    return this._http
      .get(this.globals.globalConStr + this._caseHistoryURL + caseId, {
        withCredentials: true
      })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  getUserRole(): String {
    if (this.systemUser != null && this.systemUser !== undefined ) {
      return this.systemUser.systemUserStorage.Role;
    } else {
      return '';
    }
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
