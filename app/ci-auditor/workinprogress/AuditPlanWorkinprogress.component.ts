import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';
import { AuditorClass } from '../auditor-class';

@Component({
  selector: 'app-workinprogress',
  templateUrl: './AuditPlanWorkinprogress.component.html',
  styleUrls: ['./AuditPlanWorkinprogress.component.scss']
})
export class AuditPlanWorkinprogressComponent implements OnInit {

  caseID: any;
  auditPlans: Array<any>[];
  errorMessage: String;
  windowLabel:String;
  isLoaded:boolean = false;
  constructor(private auditServices: AuditorTemplateService, private router: Router,
    private storageDataAuditService: AuditDataproviderService,
    private storageData: AuditDataproviderService ) {
    
  }

  ngOnInit() {
   
   this.windowLabel = "Saved Audit Plans";
   this.storageDataAuditService.auditDataPlanStorage = null;
   this.getWorkInProgressAuditPlans();
  }

  
  getWorkInProgressAuditPlans() {
    this.auditServices.getAuditWorkInProgressPForms()
      .subscribe(res => {
        if (res != null && res.length > 0) {
          this.auditPlans = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }

  EditAuditPlan(auditPlan){
   // this.storageData.auditCaseType = audit.Type;
    this.storageData.auditDataPlanStorage = auditPlan;
    this.router.navigate(['/createauditplan']);

  }
}
