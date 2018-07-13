import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

import  swal  from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-audit-approvals',
  templateUrl: './audit-approvals.component.html',
  styleUrls: ['./audit-approvals.component.scss']
})
export class AuditApprovalsComponent implements OnInit {

  auditItems:Array<any> = [];
  errorMessage:String;
  windowLabel:String = "Audit Plans To Review";
  isLoaded: boolean = false;


  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private auditplanData:AuditPlanProviderService) { }

  ngOnInit() {
    this. getAllAuditPlansForApproval();
  }

  getAllAuditPlansForApproval(){

    this.ciManageService.getAllAuditPlansForApproval()
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

  approveAuditPlan(auditItem){
      auditItem.PlanStage = "Audit Case Approval";
      this.auditplanData.auditPlanStroage = auditItem;
      this.router.navigate(['/auditplanworrework']);
  }

}
