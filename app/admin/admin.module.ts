import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UserAdminService } from './user-admin.service';
import {DataTableModule, DialogModule, DropdownModule} from 'primeng/primeng';
import {LoadingbarModule}  from 'app/shared-modules/loadingbar/loadingbar-module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CommonUser } from './commonuser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    DropdownModule,
    DialogModule,
    LoadingbarModule
  ],
  providers:[UserAdminService, CommonUser],
  declarations: [AdminViewComponent,  UserEditComponent]
})
export class AdminModule { }
