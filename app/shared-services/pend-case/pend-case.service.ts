import { Injectable } from '@angular/core';
import { IPendCase } from "app/shared-services/pend-case/pend-case-interface";
import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import { SystemUserProviderService } from "app/system-user-provider.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PendCaseService {
 
  constructor(private pendData: PendCaseDataService,private systemUser:SystemUserProviderService) { }

 
}
