import { Component, OnInit } from '@angular/core';
import { UserAdminClass } from '../user-admin-class';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';
import { UserAdminService } from '../user-admin.service';

import swal from 'sweetalert2';
import { PagerService } from '../../shared-services/pager.service';
import { CommonUser } from '../commonuser';
import { RoleAdminClass } from '../role-admin-class';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  userAdmin: UserAdminClass = new UserAdminClass();
  roleAdmin: RoleAdminClass = new RoleAdminClass();

  displayDialog: boolean;
  displayRoles = false;
  displayRolesDialog: boolean;
  userAdminItems: Array<any>;
  errorMessage: string;
  userRoleItems: Array<any>;
  regionItems: Array<any>;

  items: Array<any>;

  pageNumber = 0;
  currentIndex = 1;
  pagesIndex: Array<number>;

  yearFilter: number;

  yearTimeout: any;

  isLoaded = false;
  groupByManger = false;
  constructor(
    private userAdminService: UserAdminService,
    private pagerService: PagerService,
    private _user: CommonUser
  ) {
    this.getAllroles();
    this.getRegion();
  }

  ngOnInit() {
    this.getAlluser();
    this._user.userAdmin = new UserAdminClass();
  }

  getAlluser() {
    this.userAdminService.getAlluser().subscribe(res => {
      if (res != null) {
        this.userAdminItems = res;
        this._user.userAdminItems = res;
      } else {
        swal('No Records Found!', '', 'info');
      }
      this.isLoaded = true;
    }, error => (this.errorMessage = <any>error));
  }

  getAllroles() {
    this.userAdminService.getAllroles().subscribe(res => {
      if (res != null) {
        this.userRoleItems = res;
        this._user.userRoleItems = res;
      } else {
        swal('No Records Found!', '', 'info');
      }
    }, error => (this.errorMessage = <any>error));
  }

  getRegion() {
    this.userAdminService.getRegion().subscribe(res => {
      if (res != null) {
        this.regionItems = res;
        this._user.regionItems = res;
      } else {
        swal('No Records Found!', '', 'info');
      }
    }, error => (this.errorMessage = <any>error));
  }

  userEdit(userAdminItem) {
    this.userAdmin = userAdminItem;
    this._user.userAdmin = userAdminItem;
    this.applyFilter();
    this._user.hidemanager = true;
    this.displayDialog = true;
  }

  applyFilter() {
    this._user.filteredAdminItems = this._user.userAdminItems.filter(
      x => x.RegionId === this._user.userAdmin.RegionId
    );
    const parentrole = this._user.userRoleItems.find(
      x => x.RoleName === this._user.userAdmin.Role
    ).ParentRoleName;
    if (parentrole != null) {
      this._user.filteredAdminItems = this._user.filteredAdminItems.filter(
        x => x.Role === parentrole
      );
    }
  }
  addUser() {
    this.userAdminService.saveUser(this._user.userAdmin).subscribe(res => {
      swal('User', 'User Added/Updated Successfully', 'success');
      this.userAdmin = new UserAdminClass();
      if (this.userAdminItems.indexOf(this._user.userAdmin) === 0) {
        this.userAdminItems.push(this._user.userAdmin);
      }
      this.displayDialog = false;
    }, error => (this.errorMessage = <any>error));
  }

  showDialogToAdd() {
    this._user.userAdmin = new UserAdminClass();
    this._user.hidemanager = true;
    this.displayDialog = true;
  }

  userRole(role) {
    this.roleAdmin = role;
    this.displayRolesDialog = true;
  }

  UpdateUser(role) {
    this.roleAdmin = role;
    this.roleAdmin.ParentRoleName = this.userRoleItems.find(
      x => x.RoleId === role.ParentRoleId
    ).RoleName;
    this.userAdminService.saveRole(this.roleAdmin).subscribe(res => {
      swal('Role', 'Role Added/Updated Successfully', 'success');
    });
    this.displayRolesDialog = false;
  }
  groupThis() {
    this.groupByManger = !this.groupByManger;
  }
  expandMe() {
    this.displayRoles = !this.displayRoles;
  }
  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'year', 'gt');
    }, 250);
  }
}
