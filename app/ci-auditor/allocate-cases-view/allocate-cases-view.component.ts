import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';
import { CiAllocatedCases } from '../CiAllocatedCases';

@Component({
  selector: 'app-allocate-cases-view',
  templateUrl: './allocate-cases-view.component.html',
  styleUrls: ['./allocate-cases-view.component.scss']
})
export class AllocateCasesViewComponent implements OnInit {

  filteredvddlDetails: Array<any>[];
  vddlItems: Array<any>;
  raCases: Array<any>;
  combinedCiAllocatedCases: any;
  combinedCiAllocatedCasesDisplayGridItems: Array<any>;
  errorMessage: String;
  whichLinkWasclicked: String;
  windowLabel: String;
  isLoaded:boolean = false;

  constructor(private auditservice: AuditorTemplateService, private ActivatedRouter: ActivatedRoute, private router: Router, private systemUser: SystemUserProviderService, private storageData: AuditDataproviderService) {
    // find out which link was clicked
    this.whichLinkWasclicked = ActivatedRouter.snapshot.data["link"];
  }

  ngOnInit() {
    if (this.whichLinkWasclicked == "AuditWorkprogressVddl") {
      this.getAuditTemplateWIP();

    }
    if (this.whichLinkWasclicked == "AuditAllocationVddl") {
      this.windowLabel = "Allocated Cases";
      this.getCompleteAuditPlanList();

    }
    // if(this.whichLinkWasclicked =="AuditApprovedVddl"){
    //     this.getManagerAllocatedVDDL()
    // }

  }
  getCompleteAuditPlanList() {
    this.auditservice.getCompleteAuditPlanList()
      .subscribe(res => {
        if (res != null) {
          // VDDL Cases
          this.combinedCiAllocatedCases = res;
          this.combinedCiAllocatedCasesDisplayGridItems = [];
          this.vddlItems = this.combinedCiAllocatedCases.VddlResult;
          if (this.vddlItems != null) {
            this.vddlItems.forEach(element => {
               var caseDetail = new CiAllocatedCases();
               caseDetail.CaseRefNo = element.VddlDetails.CaseRefNo;
               caseDetail.CompanyRegisteredNumber = element.VddlDetails.CompanyRegisteredNumber;
               caseDetail.CustomsExciseCode = element.VddlDetails.CustomsExciseCode;
               caseDetail.DateCreated = element.VddlDetails.DateCreated;
               caseDetail.IncomeTax = element.VddlDetails.IncomeTax;
               caseDetail.TradingName = element.VddlDetails.TradingName;
               caseDetail.VATNumber = element.VddlDetails.VATNumber;
               caseDetail.Type = element.CaseType;
               caseDetail.CaseId = element.VddlDetails.CaseId;
               caseDetail.Status = "CI Allocation";
               this.combinedCiAllocatedCasesDisplayGridItems.push(caseDetail);
            });
          }

          // Risk assessment cases
          this.raCases = this.combinedCiAllocatedCases.RiskAssessmentReportCase;
          if (this.raCases != null) {
            this.raCases.forEach(element => {

              if(element.RiskAssessmentReportResult !=  null && element.RiskAssessmentReportResult.RegistrationParticulars != null) {
                var caseDetail = new CiAllocatedCases();
              caseDetail.CaseRefNo = element.RiskAssessmentReportResult.CaseRefNo;
              caseDetail.CompanyRegisteredNumber = element.RiskAssessmentReportResult.RegistrationParticulars.CompanyNbr;
              caseDetail.CustomsExciseCode = element.RiskAssessmentReportResult.RegistrationParticulars.CustomsCode;
 
              if(element.RiskAssessmentReportResult.RiskStatement != null && element.RiskAssessmentReportResult.RiskStatement.length > 0 )
              caseDetail.DateCreated = element.RiskAssessmentReportResult.RiskStatement[0].DateCreated;
              else
              caseDetail.DateCreated = null;
              
              caseDetail.IncomeTax = element.RiskAssessmentReportResult.RegistrationParticulars.IncomeTaxNbr;
              caseDetail.TradingName = element.RiskAssessmentReportResult.RegistrationParticulars.TradingName;
              caseDetail.VATNumber = element.RiskAssessmentReportResult.RegistrationParticulars.VATNumber;
              caseDetail.CaseId = element.RiskAssessmentReportResult.CaseId;
              caseDetail.Type = element.CaseType;
              caseDetail.Status = "CI Allocation";
              this.combinedCiAllocatedCasesDisplayGridItems.push(caseDetail);
              }
            });
          }

        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);

  }

  getManagerAllocatedVDDL() {
    this.auditservice.getManagerAllocatedVDDL()
      .subscribe(res => {
        if (res != null) {
          this.combinedCiAllocatedCases = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);

  }

  getAuditTemplateWIP() {
    this.auditservice.getAuditTemplateWIP()
      .subscribe(res => {
        if (res != null) {
          this.combinedCiAllocatedCases = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error);
  }


  createAudit(audit) {
     var auditCase = null;
    if(audit.Type == 'Voluntary Disclosure/Demand Led')
    {
       auditCase = this.vddlItems.filter(item => item.VddlDetails.CaseId === audit.CaseId);
       this.storageData.auditDataStorage = auditCase != null ? auditCase[0] : null ;
    }
    else
    {
      auditCase = this.raCases.filter(item => item.RiskAssessmentReportResult.CaseId === audit.CaseId);
      this.storageData.AuditDataRiskAssessment = auditCase != null ? auditCase[0] : null ;
    }
     
    this.storageData.auditCaseType = audit.Type;
    this.storageData.auditDataPlanStorage = null;
    this.router.navigate(['/createauditplan']);

  }

}
