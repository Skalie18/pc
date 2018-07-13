import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashBoardModule } from './dash-board/dash-board.module';
import { SidenavComponent } from 'app/layout/sidenav/sidenav.component';
import { ClientInterfaceModule } from './client-interface/client-interface.module';
import { HeaderComponent } from './layout/header/header/header.component';
import { CiAuditorModule } from 'app/ci-auditor/ci-auditor.module';
import { UserModule } from 'app/user/user.module';
import { CrcsSpecialistModule } from 'app/crcs-specialist/crcs-specialist.module';
/*import { PagerService } from './pager.service';
import { UpdateDatagridService } from './update-datagrid.service';
import { AuthenticationService } from './authentication.service';*/


import { ErrorViewComponent } from './error-view/error-view.component';
import { SystemUserProviderService } from './system-user-provider.service';
import { AdminModule } from './admin/admin.module';
import { CiManagerModule } from 'app/ci-manager/ci-manager.module';
import { CiAuditorManagerModule } from 'app/ci-auditor-manager/ci-auditor-manager.module';
import { UpdateDatagridService } from './shared-services/update-datagrid.service';
import { AuthenticationService } from './shared-services/authentication.service';
import { DocumentViewerService } from './shared-services/document-viewer-service';
import { SearchDataService } from './search/search-data.service';

import { PagerService } from './shared-services/pager.service';
import { LookUpService } from 'app/lookUp/lookup.service';

import { DocumentUploadProviderService } from './providers/document-upload-provider.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";
import { AllocateViewService } from 'app/shared-modules/allocate/allocate-view.service';
import { DocumentUploadModule } from './shared-modules/document-upload/document-upload.module';
import { AuditPlanProviderService } from './providers/audit-plan-provider.service';
import { CrcsManagerModule } from './crcs-manager/crcs-manager.module';
import { SearchModule } from 'app/search/search.module';

import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import { IncometaxValidationService } from './shared-services/validations/incometax-validation.service';
import { VatValidationService } from './shared-services/validations/vat-validation.service';
import { ReviwerModule } from './reviwer/reviwer.module';
import { QualityAssurerModule } from './quality-assurer/quality-assurer.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { TestDirective } from './directives/test.directive';
import { IdValidationService } from './shared-services/validations/id-validation.service';
import { CompanyRegValidationService } from './shared-services/validations/company-reg-validation.service';
import { CustomExciseValidationService } from './shared-services/validations/custom-excise-validation.service';
import { ViewchangedatastoreService } from './providers/viewchangedatastore.service';
import { ReportsModule } from './reports/reports.module';
import { ReportsServiceService } from './reports/reports-service.service';
import { CommentViewProviderService } from 'app/shared-modules/comments-view/comments-view-provider.service';
import { LoadingbarModule } from './shared-modules/loadingbar/loadingbar-module';
import { Globals } from './globals';
import { ImpersonationService } from './layout/header/impersonation-service';
import { ExportToExcelService } from './shared-services/export-to-excel.service';
import { ExportToPdfService } from './shared-services/export-to-pdf.service';



@NgModule({
  declarations: [
    AppComponent,
    // ErrorViewComponet,
    SidenavComponent,
    HeaderComponent
    // AllocateViewComponent    
  ],

  exports: [
    DocumentUploadModule,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    //  SharedDirectivesModule,
    HttpModule,
    FormsModule,
    DocumentUploadModule,
    DashBoardModule,
    ClientInterfaceModule,
    CiAuditorModule,
    CiAuditorManagerModule,
    UserModule,
    CrcsSpecialistModule,
    AdminModule,
    SearchModule,
    CiManagerModule,
    CrcsManagerModule,
    ReviwerModule,
    QualityAssurerModule,
    LoadingbarModule,
    // AngularDateTimePickerModule,
    // BsDatepickerModule,

    //Always at the bottom
    AppRoutingModule,
    ReportsModule
  ],
  providers: [
    PagerService,
    UpdateDatagridService,
    AuthenticationService,
    SystemUserProviderService,
    DocumentViewerService,
    LookUpService,
    DocumentUploadProviderService,
    CommentsViewDataService,
    AllocateViewService,
    AuditPlanProviderService,
    SearchDataService,
    PendCaseDataService,
    IncometaxValidationService,
    VatValidationService,
    IdValidationService,
    CompanyRegValidationService,
    CustomExciseValidationService,
    ViewchangedatastoreService,
    ReportsServiceService,
    CommentViewProviderService,
    Globals,
    ImpersonationService,
    ExportToExcelService,
    ExportToPdfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
