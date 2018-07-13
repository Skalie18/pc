import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuthenticationService } from '../../../shared-services/authentication.service';
import { Router } from '@angular/router';
import { LookUpService } from 'app/lookUp/lookup.service';
import {BehaviorSubject} from 'rxjs/Rx';
import swal from 'sweetalert2';
import { Globals } from '../../../globals';
import { ImpersonationService } from '../impersonation-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  errorMessage:String;
  usersItems: Array<any> = [];

  constructor(private _ngZone:NgZone, private systemUser:SystemUserProviderService , private authService:AuthenticationService, private _router:Router,private lookup:LookUpService, 
                private globals:Globals, private impersonationService:ImpersonationService) { }

  async ngOnInit() {
    if(this.globals.userRole == 'Superuser')
      this.getUsers();
    //timer that waits for user to be loaded before getting data. 
    let interval = setInterval(() => {      
     if (this.globals.SID !== undefined) {        
        clearInterval(interval);  
        this.getUsers();
       }
     }, 1000); 
  
   
  }   
  
  getUsers() {
    if (this.globals.isDeveloper) {
      this.impersonationService.getUsers()
        .subscribe(res => {
          let uItems = res;
          if (uItems != null) {
            this.usersItems = uItems;  //.filter(x => x.ManagerSID == this.systemUser.systemUserStorage.SID)
          } else {
            swal("No Records Found!", "", "info");
          }
        },
          error => this.errorMessage = <any>error);
    }
  }
  loadUser(user) {
    this.globals.IsImpersonated = true;
    this.globals.SID = user;
    this.globals.OriginalSid = this.impersonationService.getUserSId();
    this.impersonationService.startUserImpersonation(user);
    this.impersonationService.loadImpersonatedUser();
    
  }
  resetUser() {
    this.globals.IsImpersonated = false;
    this.globals.SID = this.globals.OriginalSid;
    this.globals.OriginalSid = '';
    this.impersonationService.startUserImpersonation(this.globals.SID);
    this.impersonationService.loadImpersonatedUser();
  } 
}
