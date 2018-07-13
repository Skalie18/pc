import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-findings-closed',
  templateUrl: './findings-closed.component.html',
  styleUrls: ['./findings-closed.component.scss']
})
export class FindingsClosedComponent implements OnInit {

  auditItems: Array<any> = [];
  errorMessage: String;
  windowLabel: String = "Audit Findings Finalized";
  whichRoleActive: String;
  isLoaded:boolean = false;

  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute,
    private router: Router, private auditplanData: AuditPlanProviderService) {
    this.whichRoleActive = _router.snapshot.data["link"];
  }


  ngOnInit() {
    if (this.whichRoleActive === 'findingsfinalizedAndClosed') {
      this.getAllClosedFindings();
      this.windowLabel = "Audit Cases - Closed";
    }
    else if (this.whichRoleActive === 'findingsapprovedrejection') {
      this.getCRCSManagerApprovedRejected();
      this.windowLabel = "Audit Cases - Approved Rejections";
    } 
    else {
      this.getAllFinalizedFindings();
      this.windowLabel = "Audit Findings Finalized";
    }
  }

  getAllClosedFindings() {

    this.ciManageService.getClosedCiCasesAditorCases()
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

  getCRCSManagerApprovedRejected() {

    this.ciManageService.getCRCSManagerApprovedRejected()
      .subscribe(res => {
        if (res != null) {
          this.auditItems = res;
        } else {
          swal("No Records Found!", '', 'info');
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }

  getAllFinalizedFindings() {

    this.ciManageService.getAllFinalizedFindings()
      .subscribe(res => {
        if (res != null) {
          this.auditItems = res;
        } else {
          swal('No Records Found!', '', 'info');
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }


  executeFindings(auditItem) {
    if (this.windowLabel == 'findingsfinalizedAndClosed') {
      auditItem.PlanStage = 'Audit Findings Closed';
    }
    else {
      auditItem.PlanStage = 'Audit Findings Finalized';
    }
    this.auditplanData.auditPlanStroage = auditItem;
    this.router.navigate(['/auditplanworrework']);
  }

}
