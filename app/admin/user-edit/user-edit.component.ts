import { Component, OnInit } from '@angular/core';
import { CommonUser } from '../commonuser';
import { UserAdminClass } from '../user-admin-class';
import { UserAdminService } from '../user-admin.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userAdminItems: Array<any>;
  errorMessage: string;
  findby: string;

  constructor(private _user: CommonUser) {
  }

  ngOnInit() {
  }

  changeRegion() {
    this.findby = '';
    this.applyFilter();
  }
  searchManagers() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.findby !== '') {
      this._user.filteredAdminItems = this._user.userAdminItems
                                .filter(x => x.RegionId === this._user.userAdmin.RegionId)
                                .filter(x => x.SID.toLowerCase().indexOf(this.findby) >= 0 ||
                                      x.FirstName.toLowerCase().indexOf(this.findby) >= 0 ||
                                      x.LastName.toLowerCase().indexOf(this.findby) >= 0  );

    } else {
      this._user.filteredAdminItems = this._user.userAdminItems.filter(x => x.RegionId === this._user.userAdmin.RegionId);
    }
    if (this._user.userAdmin.Role !== undefined) {
      const parentrole = this._user.userRoleItems.find( x => x.RoleName === this._user.userAdmin.Role).ParentRoleName;
      if  (parentrole != null ) {
        this._user.filteredAdminItems = this._user.filteredAdminItems.filter(x => x.Role === parentrole);
      }
    }
  }
}
