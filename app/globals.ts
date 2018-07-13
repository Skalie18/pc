import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from './shared-services/authentication.service';
import { SystemUserProviderService } from './system-user-provider.service';

@Injectable()
export class Globals {
    private settingsUrl = 'assets/settings.json';
    IsImpersonated = false;
    OriginalSid: String;
    userRole: String;
    SID: String;
    name: String;
    Surname: String;
    RegionName: String;
    isDeveloper = false;
    VersionNumber: String = '1.1.0';

    globalConStr: String;

    errorMessage: string ;

    constructor(private http: Http) {
        const that = this;
        const res = this.getJSON();
    }

    async getJSON():  Promise<string> {
      const response = await this.http.get(this.settingsUrl).toPromise();
      this.globalConStr = response.json().urlAddress;
      this.VersionNumber = response.json().versionNumber;
      return response.json().urlAddress;
    }



}
