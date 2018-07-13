import { Component, OnInit, NgZone } from '@angular/core';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthenticationService } from '../../shared-services/authentication.service';
import { Globals } from '../../globals';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  errorMessage: String;
  items: MenuItem[];

  constructor(private _ngZone: NgZone, private systemUser: SystemUserProviderService, private authService: AuthenticationService,
     private _router: Router, private globals: Globals) { }

  async ngOnInit() {

    this.items = [
      {
        label: 'File',
        icon: 'fa-file-o', 
        items: [{
          label: 'New',
          icon: 'fa-plus',
          items: [
            { label: 'Project' , routerLink : '/dashboard' },
            { label: 'Other' , routerLink : '/dashboard' },
          ]
        },
        { label: 'Open', routerLink : '/dashboard'},
        { label: 'Quit' , routerLink : '/dashboard' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              { label: 'Save', icon: 'fa-save' },
              { label: 'Update', icon: 'fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              { label: 'Delete', icon: 'fa-minus' }
            ]
          }
        ]
      }
    ];
  }


  // getAuthenticatedUser() {
  //   if (!this.globals.IsImpersonated)
  //   {
  //     this.authService.getLoggedInUser()
  //       .subscribe(res => {
  //           if(res instanceof Object){
  //           this.systemUser.systemUserStorage = res;
  //             // let user = JSON.stringify(res);
  //             // localStorage.setItem('User',user);
  //             if (this.systemUser.systemUserStorage != null) {
  //               this.globals.userRole = this.systemUser.systemUserStorage.Role;
  //             }

  //         }
  //     },
  //     error => this.errorMessage = <any>error);      
  //   }    
  // }
  
}
