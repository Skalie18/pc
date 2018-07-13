import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiManagerComponent } from './ci-manager/ci-manager.component';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { AuditApprovalsComponent } from './audit-approvals/audit-approvals.component';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { AllocateViewModule } from '../shared-modules/allocate/allocate-view.module';
import { FindingsApprovalsLetterComponent } from './findings-approvals-letter/findings-approvals-letter.component';
import { RaAuditscopeComponent } from './ra-auditscope/ra-auditscope.component';
import { DataTableModule, ButtonModule } from 'primeng/primeng';
import { LoadingbarModule }  from 'app/shared-modules/loadingbar/loadingbar-module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommentsViewModule,
    DataTableModule,
    AllocateViewModule,
    ButtonModule,
    LoadingbarModule
  ],exports:[CiManagerComponent],
  providers:[CiManagerService],
  declarations: [CiManagerComponent, AuditApprovalsComponent, FindingsApprovalsLetterComponent, RaAuditscopeComponent]
})
export class CiManagerModule {  }
