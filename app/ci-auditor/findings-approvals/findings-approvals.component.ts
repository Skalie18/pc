import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

import  swal  from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-findings-approvals',
  templateUrl: './findings-approvals.component.html',
  styleUrls: ['./findings-approvals.component.scss']
})

export class FindingsApprovalsComponent implements OnInit {

  auditItems:Array<any> = [];
  errorMessage:String;
  windowLabel: String = "Available Audit Case Findings";
  isLoaded: boolean = false;

  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private auditplanData:AuditPlanProviderService) { }

  ngOnInit() {
    this. getAllAuditPlansForApproval();
  }

  getAllAuditPlansForApproval() {
    this.ciManageService.getApprovalFindings()
      .subscribe(res => {
        if (res != null) {
          this.auditItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }

  getApprovedFindings() {

    this.ciManageService.getAllApprovedFindings()
      .subscribe(res => {
        if (res != null) {
          this.auditItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  executeFindings(auditItem){
       auditItem.PlanStage = "Review Audit Case Findings";
      this.auditplanData.auditPlanStroage = auditItem;
      this.router.navigate(['/auditplanworrework']);
  }
}
