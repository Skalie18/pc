import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';

@Component({
  selector: 'app-findings-rejected',
  templateUrl: './findings-rejected.component.html',
  styleUrls: ['./findings-rejected.component.scss']
})
export class FindingsRejectedComponent implements OnInit {

  auditItems: Array<any> = [];
  errorMessage: String;
  windowLabel: String = "Audit Case Findings - Reject";
  isLoaded:boolean = false;

  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, 
    private router: Router, private auditplanData: AuditPlanProviderService, private auditJustPlanStorage : AuditDataproviderService) { }


  ngOnInit() {
    this.getApprovedFindings();
  }

  getApprovedFindings() {

    this.ciManageService.getAllFindingsRejected()
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
    
    // auditItem.PlanStage = "Audit Case Findings - Rework";
    // this.auditplanData.auditPlanStroage = auditItem;
    // this.router.navigate(['/auditplanworrework']);


    // if(auditItem.AuditTemplate.Status == 'CI: Rejected Audit Case')
    // {
    //   this.auditJustPlanStorage.auditDataPlanStorage = auditItem;
    //   this.router.navigate(['/createauditplan']);
    // }
    // else
    // {

      auditItem.PlanStage = "Audit Case Findings - Reject";
      this.auditplanData.auditPlanStroage = auditItem;
      this.router.navigate(['/auditplanworrework']);

   // }

  }
}
