import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserAdminClass } from './user-admin-class';
import { UserAdminService } from './user-admin.service';
@Injectable()
export class CommonUser {
    userAdmin: UserAdminClass;
    userRoleItems: Array<any>;
    regionItems: Array<any>;
    userAdminItems: Array<any>;
    filteredAdminItems: Array<any>;
    hidemanager: boolean;
}
