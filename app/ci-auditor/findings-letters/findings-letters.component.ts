import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-findings-letters',
  templateUrl: './findings-letters.component.html',
  styleUrls: ['./findings-letters.component.scss']
})
export class FindingsLettersComponent implements OnInit {

  auditItems: Array<any> = [];
  errorMessage: String;
  windowLabel: String = "Audit Case Generate Letter";
  link: string = "";
  isLoaded:boolean = false;
  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute,
     private router: Router, private auditplanData: AuditPlanProviderService) { 
      this.link =_router.snapshot.data["link"];
     }


  ngOnInit() {
    if (this.link == "findingspended")
      {
        this.windowLabel = "Audit Cases Pending";
        this.getPendedFinding();
      }
      else {
      this.getApprovedFindings();
    }
  }

  getApprovedFindings() {

    this.ciManageService.getAllApprovedFindings()
      .subscribe(res => {
        if (res != null && res.length > 0 ) {
          this.auditItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }

  getPendedFinding() {
    this.ciManageService.getAllPendingFindings()
    .subscribe(res => {
      if (res != null && res.length > 0 ) {
        this.auditItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
      this.isLoaded = true;
    },
      error => this.errorMessage = <any>error);
  }

  executeFindings(auditItem) {
    auditItem.PlanStage = "Audit Case Generate Letter";
    auditItem.Pended = this.link;
    this.auditplanData.auditPlanStroage = auditItem;
    this.router.navigate(['/auditplanworrework']);
  }

}
