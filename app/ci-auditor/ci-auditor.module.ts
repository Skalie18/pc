import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AuditplanComponent } from './auditplan.component';
import { AllocateCasesViewComponent } from './allocate-cases-view/allocate-cases-view.component';
import { AuditorTemplateService } from './auditor-template.service';
import { AuditDataproviderService } from './audit-dataprovider-service.service';
import { ApprovedAuditsPlanComponent } from './approved-audits-plan/approved-audits-plan.component';
import { AuditPlanWorkinprogressComponent } from './workinprogress/AuditPlanWorkinprogress.component';
import { AuditorReworkComponent } from './auditor-rework/auditor-rework.component';
// import { DocumentUploadComponent } from 'app/shared-modules/document-upload/document-upload.component'
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { FindingsApprovalsComponent } from './findings-approvals/findings-approvals.component';
import { FundingsApprovedComponent } from './fundings-approved/fundings-approved.component';
import { FindingsLettersComponent } from './findings-letters/findings-letters.component';
import { FindingsReworkComponent } from './findings-rework/findings-rework.component';
import { FindingsRejectedComponent } from './findings-rejected/findings-rejected.component';
import { FindingsClosedComponent } from './findings-closed/findings-closed.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import {DataTableModule, CalendarModule,ButtonModule, CheckboxModule} from 'primeng/primeng';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { LoadingbarModule } from '../shared-modules/loadingbar/loadingbar-module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommentsViewModule,
    SharedDirectivesModule,
    DocumentUploadModule,    
    DataTableModule,
    CalendarModule,
    ButtonModule,
    DialogModule,
    ToolbarModule,
    CheckboxModule,
    MultiSelectModule,
    LoadingbarModule
  ],
  declarations: [AuditplanComponent, AllocateCasesViewComponent, AuditPlanWorkinprogressComponent,
                 AuditorReworkComponent, ApprovedAuditsPlanComponent, FindingsApprovalsComponent, 
                 FundingsApprovedComponent, FindingsLettersComponent, FindingsReworkComponent, FindingsRejectedComponent, 
                 FindingsClosedComponent],
  providers:[AuditorTemplateService, AuditDataproviderService]

})
export class CiAuditorModule { }
