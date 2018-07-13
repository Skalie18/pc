import { Component, OnInit, NgZone } from '@angular/core';

import  swal  from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuthenticationService } from './shared-services/authentication.service';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ConnUrl:string ;
  errorMessage:String;

  constructor(private _ngZone:NgZone, private systemUser:SystemUserProviderService , private authService:AuthenticationService, private _router:Router, private globals:Globals) { }


  async ngOnInit() {
    let interval = setInterval(() => {      
      if (this.globals.globalConStr !== undefined) {        
        clearInterval(interval);  
        this.getAuthenticatedUser();  //stop the timer      
      }
    }, 1000);
    this._router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
  
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this._router.navigated = false;
          window.scrollTo(0, 0);
      }
    });    
  }    

  getAuthenticatedUser()
  {
    if (!this.globals.IsImpersonated)  
    {
      this.authService.getLoggedInUser()
        .subscribe(res => {
            if(res instanceof Object){
              this.systemUser.systemUserStorage = res;
              this.globals.userRole = this.systemUser.systemUserStorage.Role;
              this.globals.SID = this.systemUser.systemUserStorage.SID;
              this.globals.name = this.systemUser.systemUserStorage.FirstName;
              this.globals.Surname = this.systemUser.systemUserStorage.LastName;
              this.globals.RegionName = this.systemUser.systemUserStorage.RegionName;
              this.globals.OriginalSid = '';
              if (this.globals.SID == 's2026709' ||this.globals.SID == 's2026528'|| this.globals.SID == 's2021502' ||this.globals.SID == 's2026707')
                this.globals.isDeveloper = true;
              this._router.navigate(['/']);
          }else{
        
            this._router.navigate(['/errorpage']);
          }
      },
      error => this.errorMessage = <any>error);      
    }
    else
    {
      this.authService.getUserBySid(this.globals.SID)
      .subscribe(res => {
          if(res instanceof Object){
            this.systemUser.systemUserStorage = res;
            this.globals.userRole = this.systemUser.systemUserStorage.Role;
            this.globals.SID = this.systemUser.systemUserStorage.SID;
            this.globals.name = this.systemUser.systemUserStorage.FirstName;
            this.globals.Surname = this.systemUser.systemUserStorage.LastName;
            this.globals.RegionName = this.systemUser.systemUserStorage.RegionName;
            this._router.navigate(['/']);
        }else{
      
          this._router.navigate(['/errorpage']);
        }
      },
      error => this.errorMessage = <any>error);      
  
    }
  }
}
