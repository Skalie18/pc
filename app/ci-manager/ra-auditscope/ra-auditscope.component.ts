import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { SarProvider } from '../../user/sar-provider';
import { SarAllocationService } from '../../crcs-manager/sar-allocation.service';
import { LookUpService } from '../../lookUp/lookup.service';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { SarClass } from '../../user/sar-class';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { RiskAssessmentReportCase } from '../../crcs-specialist/risk-assessment-class';
import { VddlallocationClass } from '../../client-interface/vddlallocation-class';
import { AuditDataproviderService } from '../../ci-auditor/audit-dataprovider-service.service';

@Component({
  selector: 'app-ra-auditscope',
  templateUrl: './ra-auditscope.component.html',
  styleUrls: ['./ra-auditscope.component.scss']
})
export class RaAuditscopeComponent implements OnInit {
  gridItems: Array<any> = [];
  errorMessage: String;
  whichRoleActive: String;
  teamMember: string;
  reAllocate: string;
  trackAssignValue: string = "";

  usersItems: Array<any> = [];
  regionItems: Array<any> = [];

  regionSelectedValue: String = "";
  buttonText: String;
  viewbuttonText: String;
  WindowLabelHeader: String;
  auditTypeKownDescription: String;

  showAllocateReAllocate: boolean;
  raItemsToAllocateOrREallocate: any;
  repType: any;
  viewAllocateButton: boolean;
  riskAssessmentReportCase: RiskAssessmentReportCase = new RiskAssessmentReportCase();
  riskkAssessmentCombinedData: Array<RiskAssessmentReportCase> = [];
  gridItemsOriginal: Array<RiskAssessmentReportCase> = [];
  caseID: String;
  specificRole: string;
  urlAction: string;


  constructor(private _router: Router, private router: ActivatedRoute, private sarData: SarProvider, private sarallocationService: SarAllocationService,
    private lookUpService: LookUpService, private systemUser: SystemUserProviderService, private _riskAssessmentService: RiskAssessmentService,
    private storageDataAuditService: AuditDataproviderService) {
    this.whichRoleActive = router.snapshot.data["link"];
    if (router.snapshot.url.length > 0)
      this.urlAction = router.snapshot.url[0].path;
  }

  ngOnInit() {
    this.getUsers();
    this.getRegion();
    this.viewbuttonText = "View Details";
    if (this.whichRoleActive == "auditscopefullallocate" || this.whichRoleActive == "auditscopefullreallocate") {
      //this.getFullScopeCases();
      this.buttonText = this.getRoleType();
      this.WindowLabelHeader = "Full Scope Audit Allocation";
      this.auditTypeKownDescription = "Full Scope Audits";
    }

    if (this.whichRoleActive == "auditscopelimitedallocate" || this.whichRoleActive == "auditscopeLimitedreallocate") {
      //this.getLimitedScopeCases();;
      this.buttonText = this.getRoleType();
      this.WindowLabelHeader = "Limited Scope Audit Allocation";
      this.auditTypeKownDescription = "Limited Scope Audits";
    }

    if (this.whichRoleActive == "auditscopeintegrateallocate" || this.whichRoleActive == "auditscopeintegratereallocate") {
      // this.getIntegratedCases();
      this.buttonText = this.getRoleType();
      this.WindowLabelHeader = "Integrated Audit Allocation";
      this.auditTypeKownDescription = "Integrated Audits";
    }

    if (this.getRoleType() == "Allocate") {
      this.viewAllocateButton = true;
      this.getcheckPendAllocateGetNext();
    } else {
      this.viewAllocateButton = false;
      this.GetManagerAllocatedRa();
    }

    this.specificRole = this.getRoleType();

  }

  getRoleType() {
    switch (this.whichRoleActive) {
      case 'auditscopefullallocate':
      case 'auditscopelimitedallocate':
      case 'auditscopeintegrateallocate':
        return 'Allocate';

      case 'auditscopeintegratereallocate':
      case 'auditscopeLimitedreallocate':
      case 'auditscopefullreallocate':
        return 'Re-Allocate';

      default:
        return 'Allocate';
    }
  }

  getcheckPendAllocateGetNext() {
    this._riskAssessmentService.getcheckPendAllocateGetNext(this.auditTypeKownDescription)
      .subscribe(res => {
        if (res != null) {
          this.AddGridItems(res);

          //  this.disableGetButton = true;
        }

      },
        error => this.errorMessage = <any>error);

  }

  GetManagerAllocatedRa() {
    this._riskAssessmentService.GetManagerAllocatedRa(this.auditTypeKownDescription)
      .subscribe(res => {
        if (res != null) {
          res.forEach(gridItem => {
            this.AddGridItems(gridItem);
          })
        }

      },
        error => this.errorMessage = <any>error);
  }

  getTrackAllocate() {

    this._riskAssessmentService.getTrackAllocate(this.trackAssignValue, this.auditTypeKownDescription)
      .subscribe(res => {
        if (res != null) {
          this.AddGridItems(res);
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  getTrackReallocate() {

    this._riskAssessmentService.getTrackReallocate(this.trackAssignValue)
      .subscribe(res => {
        if (res != null) {
          this.AddGridItems(res);
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  onTrackButtonClick() {
    if (this.getRoleType() == "Allocate") {
      this.getTrackAllocate();

    } else {

      if (this.gridItemsOriginal != null && this.gridItemsOriginal.length == 0) {
        this.gridItemsOriginal = this.riskkAssessmentCombinedData;
      }

      if (this.gridItemsOriginal.length > 0) {
        var gridItemTrack = [];
        gridItemTrack = this.gridItemsOriginal.filter(item => item.RiskAssessmentReportResult.RegistrationParticulars.CustomsCode == this.trackAssignValue.trim() ||
          item.RiskAssessmentReportResult.CaseRefNo == this.trackAssignValue.trim())

        this.riskkAssessmentCombinedData = gridItemTrack;

        if (!this.trackAssignValue) {
          this.riskkAssessmentCombinedData = this.gridItemsOriginal;
        };
      }

    }

  }


  AddGridItems(raAssessmentCase) {
    this.riskAssessmentReportCase = raAssessmentCase;
    if (raAssessmentCase.RiskAssessmentReportResult != null) {
      this.caseID = this.riskAssessmentReportCase.RiskAssessmentReportResult.CaseId;
      this.riskkAssessmentCombinedData.push(raAssessmentCase);
    }

    // if (raAssessmentCase.RiskAssessmentReportResult != null) {
    //   this.caseID = raAssessmentCase.RiskAssessmentReportResult.CaseId;
    //   if (raAssessmentCase.RiskAssessmentReportResult.RiskStatement != null) {
    //     this.gridItems = [];
    //     raAssessmentCase.RiskAssessmentReportResult.RiskStatement.forEach(gridItem => {
    //       this.gridItems.push(gridItem);
    //     });
    //   }
    // }

  }


  getNextRAAllocation() {
    this._riskAssessmentService.getNextRAAllocation(this.auditTypeKownDescription)
      .subscribe(res => {
        if (res != null) {
          this.AddGridItems(res);
        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error)

  }

  getNextRAAllocationByRegion(regionid) {
    this._riskAssessmentService.getNextRAAllocationByRegion(regionid, this.auditTypeKownDescription)
      .subscribe(res => {
        if (res != null) {
          res.forEach(gridItem => {
            this.AddGridItems(gridItem);
          })

        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error)

  }


  getValue(value) {
    this.regionSelectedValue = value
  }

  getTeamMemberValue(value) {
    this.teamMember = value;
  }

  getTextValue(value) {
    this.trackAssignValue = value;
  }

  getRegion() {
    this.lookUpService.getRegion()
      .subscribe(res => {
        let rItems = res;
        if (rItems != null) {
          this.regionItems = rItems;
        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error);

  }

  getUsers() {
    this.lookUpService.getUsers()
      .subscribe(res => {
        let uItems = res;
        if (uItems != null) {
          this.usersItems = uItems.filter(x => x.ManagerSID == this.systemUser.systemUserStorage.SID);
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  allocaTeReallocateButtonRA(item) {
    this.showAllocateReAllocate = true;
    this.raItemsToAllocateOrREallocate = item;

  }

  raAllocateReallocate() {


    if (this.riskAssessmentReportCase.RaAllocation == null) {
      this.riskAssessmentReportCase.RaAllocation = new VddlallocationClass();
    }

    this.riskAssessmentReportCase.RaAllocation.AllocatorSid = this.systemUser.systemUserStorage.SID;
    this.riskAssessmentReportCase.RaAllocation.AllocateeSid = this.teamMember;
    this.riskAssessmentReportCase.RaAllocation.IsCurrent = true;
    this.riskAssessmentReportCase.RaAllocation.CaseId = this.riskAssessmentReportCase.RiskAssessmentReportResult.CaseId;
    this.riskAssessmentReportCase.IsEdit = true;
    this.riskAssessmentReportCase.AuditType = this.auditTypeKownDescription;

    this._riskAssessmentService.saveRAllocation(this.riskAssessmentReportCase)
      .subscribe(res => {
        this.repType = res;

        if (this.repType != null) {

          if (this.repType.Success == 1) {
            this.gridItems = [];
            this.riskkAssessmentCombinedData = [];
            this.showAllocateReAllocate = false;
            swal(
              'Case',
              this.repType.Message,
              'success'
            )
          }

          else {
            swal(
              'Case',
              this.repType.Message,
              'error'
            )
          }
        }

      },
        error => this.errorMessage = <any>error);

  }

  viewRiskAssessment(radetail) {
    this._router.navigate(['/createcrcs', { view: "Scope", data: this.caseID, role: this.urlAction }]);
  }

}
