import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from 'app/dash-board/dash-board/dash-board.component';
import { ClientInterfaceComponent } from 'app/client-interface/client-interface/client-interface.component';
import { AuditplanComponent } from 'app/ci-auditor/auditplan.component';
import { ActivityreportComponent } from 'app/user/activityreport.component';
import { WorkinprogressComponent } from 'app/client-interface/workinprogress/workinprogress.component';
import { UserWorkingprogressComponent } from 'app/user/user-workingprogress/user-workingprogress.component';
import { RiskasessmentComponent } from 'app/crcs-specialist/riskasessment/riskasessment.component';
import { CrcsworkinprogressComponent } from 'app/crcs-specialist/crcsworkinprogress/crcsworkinprogress.component';
import { ErrorViewComponent } from '../error-view/error-view.component';
import { AdminViewComponent } from 'app/admin/admin-view/admin-view.component';
import { CiManagerComponent } from '../ci-manager/ci-manager/ci-manager.component';
import { AllocateCasesViewComponent } from '../ci-auditor/allocate-cases-view/allocate-cases-view.component';
import { DocumentUploadComponent } from 'app/shared-modules/document-upload/document-upload.component';
import { AuditPlanWorkinprogressComponent } from '../ci-auditor/workinprogress/AuditPlanWorkinprogress.component';
import { AuditApprovalsComponent } from '../ci-manager/audit-approvals/audit-approvals.component';
import { AuditorReworkComponent } from '../ci-auditor/auditor-rework/auditor-rework.component';
import { RaApprovalComponent } from '../crcs-manager/ra-approval/ra-approval.component';
import { ApprovedAuditsPlanComponent } from '../ci-auditor/approved-audits-plan/approved-audits-plan.component';
import { RaApprovalScreenComponent } from '../crcs-manager/ra-approval-screen/ra-approval-screen.component';
import { SearchComponent } from '../search/search-view/search-view.component';
import { FindingsApprovalsComponent } from '../ci-auditor/findings-approvals/findings-approvals.component';
import { FundingsApprovedComponent } from '../ci-auditor/fundings-approved/fundings-approved.component';
import { FindingsLettersComponent } from '../ci-auditor/findings-letters/findings-letters.component';
import { FindingsRejectedComponent } from '../ci-auditor/findings-rejected/findings-rejected.component';
import { FindingsReworkComponent } from '../ci-auditor/findings-rework/findings-rework.component';
import { FindingsApprovalsLetterComponent } from '../ci-manager/findings-approvals-letter/findings-approvals-letter.component';
import { FindingsClosedComponent } from '../ci-auditor/findings-closed/findings-closed.component';
import { ReviewerWorkinComponent } from '../reviwer/reviewer-workin/reviewer-workin.component';
import { QuilityAssurerComponent } from '../quality-assurer/quility-assurer/quility-assurer.component';
import { ApprovedassessmentComponent } from '../crcs-specialist/approvedassessment/approvedassessment.component';
import { CrscompletedRatemplatesComponent } from '../crcs-specialist/crscompleted-ratemplates/crscompleted-ratemplates.component';
import { SarAllocationComponent } from '../crcs-manager/sar-allocation/sar-allocation.component';
import { RaAuditscopeComponent } from '../ci-manager/ra-auditscope/ra-auditscope.component';
import { TechnicalreviewComponent } from '../crcs-specialist/technicalreview/technicalreview.component';
import { ReportsViewComponent } from '../reports/reports-view/reports-view.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([

      { path: 'dashboard', component: DashBoardComponent },
      { path: 'createvddl', component: ClientInterfaceComponent },
      { path: 'createauditplan', component: AuditplanComponent },

      { path: 'createsar', component: ActivityreportComponent },
      { path: 'editsar', component: ActivityreportComponent },
      { path: 'sarworkinprogress', component: UserWorkingprogressComponent },

      { path: 'editvddl', component: ClientInterfaceComponent },
      { path: 'viewvddl', component: ClientInterfaceComponent },
      { path: 'vddlworkinprogress', component: WorkinprogressComponent },
      { path: 'createauditplan', component: AuditplanComponent },
      { path: 'cimanagerAllocate', component: CiManagerComponent, data: {role: 'Allocate'}},
      { path: 'cimanagerReallocate', component: CiManagerComponent, data: {role: 'ReAllocate'} },
      { path: 'cimanagerAuditApproval', component: AuditApprovalsComponent, data: {role: 'AuditApproval'} },
      { path: 'auditplanworkinprogress', component: AuditPlanWorkinprogressComponent },
      { path: 'auditplanworrework', component: AuditorReworkComponent },
      { path: 'auditallocation', component: AllocateCasesViewComponent, data: {link: 'AuditAllocationVddl'} },
      { path: 'auditapproved', component: ApprovedAuditsPlanComponent, data: {link: 'AuditApprovedVddl'}},
      { path: 'findingsApproval', component: FindingsApprovalsComponent, data: {link: 'findingsApproval'} },
      { path: 'findingsApproved', component: FundingsApprovedComponent, data: { link: 'findingsApproved' } },

      { path: 'findingsrework', component: FindingsReworkComponent, data: { link: 'findingsrework' } },
      { path: 'findingsrejected', component: FindingsRejectedComponent, data: { link: 'findingsrejected' } },
      { path: 'findingsletters', component: FindingsLettersComponent, data: { link: 'findingsletters' } },
      { path: 'findingsPended',  component: FindingsLettersComponent, data: { link: 'findingspended' } },
      { path: 'findingsApprveletters', component: FindingsApprovalsLetterComponent, data: { link: 'findingsApprveletters' } },
      { path: 'findingsclosed', component: FindingsClosedComponent, data: { link: 'findingsclosed' } },
      { path: 'findingsfinalizedAndClosed', component: FindingsClosedComponent, data: { link: 'findingsfinalizedAndClosed' } },
      { path: 'findingsapprovedrejection', component: FindingsClosedComponent, data: { link: 'findingsapprovedrejection' } },

      { path: 'admin', component: AdminViewComponent },

      { path: 'createcrcs', component: RiskasessmentComponent },
      { path: 'crcrcsworkinprogresscs', component: CrcsworkinprogressComponent, data: { link: 'crcrcsworkinprogresscs' } },
      { path: 'riskassessmentrework', component: CrcsworkinprogressComponent, data: { link: 'rarework' } },

      { path: 'crcrccompletetemplates', component: CrscompletedRatemplatesComponent },
      { path: 'raaproval', component: RaApprovalComponent },
      { path: 'raaproved', component: ApprovedassessmentComponent },
      { path: 'raaprovalscreen', component: RaApprovalScreenComponent },
      { path: 'search', component: SearchComponent},

      { path: 'sarReviewer', component: ReviewerWorkinComponent, data: { link: 'SarReviewer' }},
      { path: 'rejectedsar', component: ReviewerWorkinComponent, data: { link: 'rejectedsar' }},
      { path: 'sarpendingreview', component: ReviewerWorkinComponent, data: { link: 'sarpendingreview' }},

      { path: 'allocatesar', component: SarAllocationComponent, data: { link: 'Allocatesar' }},
      { path: 'reallotesar', component: SarAllocationComponent, data: { link: 'Reallotesar' }},
      { path: 'pulledcases', component: SarAllocationComponent, data: { link: 'Pulledcases' }},
      { path: 'saralocatedcases', component: SarAllocationComponent, data: { link: 'SarAlocatedCases' }},
      { path: 'sarpendingcases', component: SarAllocationComponent, data: { link: 'Sarpendingcases' }},

      { path: 'auditscopeFullAllocate', component: RaAuditscopeComponent, data: { link: 'auditscopefullallocate' } },
      { path: 'auditscopeFullReallocate', component: RaAuditscopeComponent, data: { link: 'auditscopefullreallocate' } },
      { path: 'auditscopeFullAuditApproval', component: FindingsApprovalsComponent, data: {link: 'auditscopeFullAuditApproval'}},
      { path: 'auditscopeFullApproval', component: FundingsApprovedComponent, data: {link: 'auditscopeFullApproval'}},
      { path: 'auditscopeFullApprveletters', component: FindingsApprovalsLetterComponent, data: {link: 'auditscopeFullApprveletters'}},

      { path: 'auditscopeLimitedAllocate', component: RaAuditscopeComponent, data: { link: 'auditscopelimitedallocate' } },
      { path: 'auditscopeLimitedReallocate', component: RaAuditscopeComponent, data: { link: 'auditscopeLimitedreallocate' } },
      { path: 'auditscopeLimitedAuditApproval', component: FindingsApprovalsComponent, data: {link: 'auditscopeLimitedAuditApproval'}},
      { path: 'auditscopeLimitedApproval', component: FundingsApprovedComponent, data: {link: 'auditscopeLimitedApproval'}},
      { path: 'auditscopeLimitedApprveletters', component: FindingsApprovalsLetterComponent,
                data: {link: 'auditscopeLimitedApprveletters'}},

      { path: 'auditscopeIntegratedAllocate', component: RaAuditscopeComponent, data: { link: 'auditscopeintegrateallocate' } },
      { path: 'auditscopeIntegratedReallocate', component: RaAuditscopeComponent, data: { link: 'auditscopeintegratereallocate' } },
      { path: 'auditscopeIntegratedAuditApproval', component: FindingsApprovalsComponent,
                data: {link: 'auditscopeIntegratedAuditApproval'}},
      { path: 'auditscopeIntegratedApproval', component: FundingsApprovedComponent, data: {link: 'auditscopeIntegratedApproval'}},
      { path: 'auditscopeIntegratedApprveletters', component: FindingsApprovalsLetterComponent,
                data: {link: 'auditscopeIntegratedApprveletters'}},

      { path: 'getTechnicalReviewForms', component: TechnicalreviewComponent, data: {link: 'getTechnicalReviewForms'}},
      { path: 'getApprovedTechnicalReviewForms', component: TechnicalreviewComponent, data: {link: 'getApprovedTechnicalReviewForms'}},
      { path: 'getApprovedTechnicalReviewQAList', component: TechnicalreviewComponent, data: {link: 'getApprovedTechnicalReviewQAList'}},
      { path: 'getRejectedTechnicalReviewForms', component: TechnicalreviewComponent, data: {link: 'getRejectedTechnicalReviewForms'}},

      { path: 'quilityassuer', component: QuilityAssurerComponent},
      { path: 'qareviewdiscardedanalysis', component: QuilityAssurerComponent, data: { link: 'qareviewdiscardedanalysis' }},

      { path: 'reports', component: ReportsViewComponent },




      // { path: 'errorpage', component: ErrorViewComponent },
      /*Always at the bottom */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
