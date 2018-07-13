import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RiskasessmentComponent } from './riskasessment/riskasessment.component';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { CrcsworkinprogressComponent } from './crcsworkinprogress/crcsworkinprogress.component';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { CrscompletedRatemplatesComponent } from './crscompleted-ratemplates/crscompleted-ratemplates.component';
import { ApprovedassessmentComponent } from './approvedassessment/approvedassessment.component';
import { TechnicalreviewComponent } from './technicalreview/technicalreview.component';

// import { DocumentUploadComponent } from '../shared-modules/document-upload/document-upload.component';
import {DataTableModule, ButtonModule} from 'primeng/primeng';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule,
    SharedDirectivesModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    ToolbarModule,
    LoadingbarModule
  ],
  declarations: [RiskasessmentComponent, CrcsworkinprogressComponent, CrscompletedRatemplatesComponent, ApprovedassessmentComponent, TechnicalreviewComponent
  ],
  providers: [RiskAssessmentService, DataProvider]
})
export class CrcsSpecialistModule { }
