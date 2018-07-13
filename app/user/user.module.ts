import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityreportComponent } from './activityreport.component';
import { UserWorkingprogressComponent } from './user-workingprogress/user-workingprogress.component';
import { UserService } from 'app/user/user.service';
import { SarProvider } from 'app/user/sar-provider';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
// import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { SplitButtonModule } from 'primeng/components/splitbutton/splitbutton';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DataTableModule, CalendarModule, ButtonModule, TooltipModule, DropdownModule, KeyFilterModule } from 'primeng/primeng';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule,
    SharedDirectivesModule,
    DataTableModule,
    ButtonModule,
    MenubarModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    CalendarModule,
    LoadingbarModule,
    TooltipModule,
    DropdownModule,
    AutoCompleteModule,
    KeyFilterModule    
    // AngularDateTimePickerModule
  ],

  declarations: [ActivityreportComponent, UserWorkingprogressComponent],

  providers:[UserService,SarProvider]
  
})

export class UserModule { }