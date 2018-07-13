import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SarProvider } from 'app/user/sar-provider';
import swal from 'sweetalert2';
import { SarAllocationService } from '../sar-allocation.service';
import { LookUpService } from 'app/lookUp/lookup.service';
import { SarClass } from '../../user/sar-class';
import { SystemUserProviderService } from 'app/system-user-provider.service';

@Component({
  selector: 'app-sar-allocation',
  templateUrl: './sar-allocation.component.html',
  styleUrls: ['./sar-allocation.component.scss']
})
export class SarAllocationComponent implements OnInit {

  gridItems: Array<any> = [];
  gridItemsOriginal: Array<any> = [];
  errorMessage: String;
  whichRoleActive: String;
  teamMember: string;
  reAllocate: string;
  trackAssignValue: string;

  usersItems: Array<any> = [];
  regionItems: Array<any> = [];

  regionSelectedValue: String = "";
  buttonText: String;
  viewbuttonText: String;
  WindowLabelHeader: String;
  sarObject: SarClass = new SarClass();

  showAllocateReAllocate: boolean;
  sarItemsToAllocateOrREallocate: any;
  repType: any;
  actionType: any;
  isLoaded: boolean = false;
  urlAction: string = '';

  constructor(private _router: Router, private router: ActivatedRoute, private sarData: SarProvider, private sarallocationService: SarAllocationService, private lookUpService: LookUpService, private systemUser: SystemUserProviderService) {
    this.whichRoleActive = router.snapshot.data["link"];
    this.actionType = this.router.snapshot.params["actionType"];
  }

  ngOnInit() {

    this.getUsers();
    this.getRegion();

    if (this.whichRoleActive == "Reallotesar") {
      this.getAllocatedCases();
      this.buttonText = "Re Allocate";
      this.WindowLabelHeader = "SAR Allocation / Re Allocate"
    }

    else if (this.whichRoleActive == "Allocatesar" && this.actionType == "AllocateToQa") {
      this.buttonText = "Allocate";
      this.WindowLabelHeader = "QA Allocation";
      var sarCase = this.sarData.sarStorage;
      if (sarCase) {
        this.getQACaseById(sarCase.CaseId);
      }
    }

    else if (this.whichRoleActive == "Allocatesar") {
      this.buttonText = "Allocate";
      this.WindowLabelHeader = "SAR Allocation / Re Allocate"
      this.getPulledByUseCases();
    }
    else if (this.whichRoleActive == "SarAlocatedCases") {
      this.getIndepthAllocatedCases();
      this.viewbuttonText = "Analyse";
      this.WindowLabelHeader = "Indepth Analysis Cases";
    }

    else if (this.whichRoleActive == "Sarpendingcases") {
      this.getPendingCases();
      this.viewbuttonText = "View";
      this.WindowLabelHeader = "Pending Analysis Cases";
    }

    this.viewbuttonText = "View Details";

  }



  getNextSarAllocation() {

    this.sarallocationService.getNextSarAllocation()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error)

  }

  getPulledByUseCases() {
    this.sarallocationService.getPulledByUseCases()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = [];
          this.gridItems.push(res);
        } else {
          // swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error)
  }

  getQACaseById(sarcaseId: any) {
    this.sarallocationService.getQACaseById(sarcaseId)
      .subscribe(res => {
        if (res != null) {
          this.gridItems = [];
          this.gridItems.push(res);
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error)
  }

  getPendingCases() {
    this.sarallocationService.getPendingCases()
      .subscribe(res => {
        if (res != null && res.length > 0) {
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error)
  }

  getAllocatedCases() {
    this.sarallocationService.getAllocatedCases()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = [];
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error)
  }

  getIndepthAllocatedCases() {
    this.sarallocationService.getIndepthAllocatedCases()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = [];
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
        error => this.errorMessage = <any>error)
  }


  getTrackAllocate() {

    this.sarallocationService.getTrackAllocate(this.trackAssignValue)
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  onTrackButtonClick() {

    if (this.whichRoleActive == "Allocatesar") {
      this.getTrackAllocate();

    } else {

      if (this.gridItemsOriginal != null && this.gridItemsOriginal.length == 0) {
        this.gridItemsOriginal = this.gridItems;
      }

      if (this.gridItemsOriginal.length > 0) {
        var gridItemTrack = [];
        gridItemTrack = this.gridItemsOriginal.filter(item => item.SuspiciousActivityReportDetails.SarsRefDetails[0].CustomsExciseCode == this.trackAssignValue.trim() ||
          item.SuspiciousActivityReportDetails.CaseDetails.ReferenceNumber == this.trackAssignValue.trim()
        )

        this.gridItems = gridItemTrack;

        if (!this.trackAssignValue) {
          this.gridItems = this.gridItemsOriginal;
        };
      }

    }

  }

  getTrackReallocate() {

    this.sarallocationService.getTrackReallocate(this.trackAssignValue)
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }


  getNextSarAllocationByRegion(regionid) {
    this.sarallocationService.getNextSarAllocationByRegion(regionid)
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
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
          if (this.actionType == 'AllocateToQa') {
            this.usersItems = this.usersItems.filter(x => x.Role == 'CRCS Quality Assurer');
          }
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  allocaTeReallocateButtonSar(item) {
    this.showAllocateReAllocate = true;
    this.sarItemsToAllocateOrREallocate = item;

  }

  sarAllocateReallocate() {
    if (this.sarItemsToAllocateOrREallocate.SarAllocation == null) {
      this.sarObject.SarAllocation.CaseId = this.sarItemsToAllocateOrREallocate.SuspiciousActivityReportDetails.CaseDetails.CaseId;
      this.sarItemsToAllocateOrREallocate.CaseId = this.sarItemsToAllocateOrREallocate.SuspiciousActivityReportDetails.CaseDetails.CaseId;
      this.sarObject.SarAllocation.AllocatorSid = this.systemUser.systemUserStorage.SID;
      this.sarObject.SarAllocation.AllocateeSid = this.teamMember;
      this.sarObject.SarAllocation.IsCurrent = true;
      this.reAllocate = "Allocate";
      this.sarItemsToAllocateOrREallocate.SarAllocation = this.sarObject.SarAllocation;

    } else {
      this.reAllocate = "Re Allocate";
      this.sarObject.SarAllocation = this.sarItemsToAllocateOrREallocate.SarAllocation;
      this.sarItemsToAllocateOrREallocate.SarAllocation.AllocateeSid = this.teamMember;
    }

    this.sarallocationService.saveSARAllocation(this.sarItemsToAllocateOrREallocate)
      .subscribe(res => {
        this.repType = res;
        if (this.repType != null) {

          if (this.repType.Success == 1) {
            this.gridItems = [];
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


  viewSar(saretail) {
    this.sarData.sarStorage = saretail;
    this.sarData.sarStorage.Stage = this.WindowLabelHeader;
    this._router.navigate(["/editsar", { view: "sarReviewe", role: this.whichRoleActive }]);
  }


}
