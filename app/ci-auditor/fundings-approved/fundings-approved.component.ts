import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-fundings-approved',
  templateUrl: './fundings-approved.component.html',
  styleUrls: ['./fundings-approved.component.scss']
})
export class FundingsApprovedComponent implements OnInit {

  auditItems: Array<any> = [];
  errorMessage: String;
  windowLabel: String = "Approved Audit Case Findings";
  isLoaded:boolean = false;
  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private auditplanData: AuditPlanProviderService) { }


  ngOnInit() {
    this.getApprovedFindings();
  }

  getApprovedFindings() {

    this.ciManageService.getAllApprovedDemandFindings()
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

  executeFindings(auditItem) {
    auditItem.PlanStage = "Finalize Audit Case Findings";
    this.auditplanData.auditPlanStroage = auditItem;
    this.router.navigate(['/auditplanworrework']);
  }
}
