import { Component, OnInit } from '@angular/core';
import { CiManagerService } from '../ci-manager.service';
import { SystemUserProviderService } from '../../system-user-provider.service';

import swal from 'sweetalert2';
import { IVddl } from 'app/client-interface/vd-dl-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CiMangerClass } from 'app/ci-manager/ci-manger-class';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { VddlallocationClass } from '../../client-interface/vddlallocation-class';
import { debuglog } from 'util';
import { AllocateViewService } from 'app/shared-modules/allocate/allocate-view.service';

@Component({
  selector: 'app-ci-manager',
  templateUrl: './ci-manager.component.html',
  styleUrls: ['./ci-manager.component.scss'],
})
export class CiManagerComponent implements OnInit {

  track: String = '';
  region: any;
  gridItems: Array<any> = [];
  gridItemsOriginal: Array<any> = [];
  usersItems: any;
  regionItems: any;
  errorMessage: String;
  disableGetButton: boolean = false

  regionSelectedValue: String = "";
  whichRoleActive: String;
  viewAllocateButton: boolean;
  showAllocateReAllocate: boolean;

  vdllAllocateObject: CiMangerClass = new CiMangerClass();

  itemsToAllocateOrREallocate: any;
  repType: any;
  teamMember: string;
  reAllocate: string;
  trackAssignValue: string = "";


  constructor(private _allo: AllocateViewService, private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private vddlData: vddlDataProvider) {

    this.whichRoleActive = _router.snapshot.data["role"];

  }

  ngOnInit() {

    this.getRegion();
    this.getUsers();

    if (this.whichRoleActive == "Allocate") {

      this.viewAllocateButton = true;
      this.getcheckPendAllocateGetNext();

    } else {
      this.viewAllocateButton = false;
      this.getManagerAllocatedVDDL();
    }

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

  getNextCaseToAllocate() {
    this.ciManageService.getNextCasePending()
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }


  getCaseByRegion() {

    this.ciManageService.getCaseByRegion(this.regionSelectedValue)
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);


  }


  getUsers() {
    this.ciManageService.getUsers()
      .subscribe(res => {
        if (res != null) {
          this.usersItems = res.filter(x => x.ManagerSID == this.systemUser.systemUserStorage.SID);
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  allocaTeReallocateButton(item) {
    this.showAllocateReAllocate = true;
    this.itemsToAllocateOrREallocate = item;

  }


  allocateReallocate() {

    if (this.itemsToAllocateOrREallocate.VddlAllocation == null) {
      this.vdllAllocateObject.VddlAllocation.CaseId = this.itemsToAllocateOrREallocate.VddlDetails.CaseId;
      this.vdllAllocateObject.VddlAllocation.AllocatorSid = this.systemUser.systemUserStorage.SID;
      this.vdllAllocateObject.VddlAllocation.AllocateeSid = this.teamMember;
      this.vdllAllocateObject.VddlAllocation.IsCurrent = true;
      this.vdllAllocateObject.VddlAllocation.ActionType = "Allocate";
      this.reAllocate = "Allocate";
      this.itemsToAllocateOrREallocate.VddlAllocation = this.vdllAllocateObject.VddlAllocation;

    } else {
      this.reAllocate = "Re Allocate";
      this.itemsToAllocateOrREallocate.VddlAllocation.ActionType = "Reallocate";
      this.vdllAllocateObject = this.itemsToAllocateOrREallocate.VddlAllocation;
      this.itemsToAllocateOrREallocate.VddlAllocation.AllocateeSid = this.teamMember;
    }

    this.ciManageService.allocateReallocate(this.itemsToAllocateOrREallocate)
      .subscribe(res => {
        this.repType = res;
        if (this.repType != null) {
          if (this.repType.Success == 1) {
            this.gridItems = [];
            this.showAllocateReAllocate = false;
            this.track = null;
            this.region = null;
            swal(
              'Case',
              this.repType.Message,
              'success'
            )
          }
        }

        else {
          swal(
            'Case',
            this.repType.Message,
            'error'
          )
        }

      },
        error => this.errorMessage = <any>error);

  }

  getcheckPendAllocateGetNext() {
    this.ciManageService.getcheckPendAllocateGetNext()
      .subscribe(res => {

        if (this.gridItems && this.gridItems.length == 0)
          this.gridItems = [];

        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        }

      },
        error => this.errorMessage = <any>error);

  }

  getRegion() {
    this.ciManageService.getRegion()
      .subscribe(res => {
        this.regionItems = res;
      },
        error => this.errorMessage = <any>error);

  }

  getAllocated() {
    this.ciManageService.getAllocated()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  getTrackAllocate() {

    this.ciManageService.getTrackAllocate(this.trackAssignValue)
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
        } else {
          this.track = null;
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  getTrackReallocate() {

    this.ciManageService.getTrackReallocate(this.track)
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
        } else {
          this.track = null;
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  onTrackButtonClick() {


    if (this.whichRoleActive == "Allocate") {
      if (this.trackAssignValue) {
        this.getTrackAllocate();
      }

    } else {

      if (this.gridItemsOriginal != null && this.gridItemsOriginal.length == 0) {
        this.gridItemsOriginal = this.gridItems;
      }

      if (this.gridItemsOriginal.length > 0) {
        var gridItemTrack = [];
        gridItemTrack = this.gridItemsOriginal.filter(item => item.VddlDetails.CustomsExciseCode == this.trackAssignValue.trim() || item.VddlDetails.CaseRefNo == this.trackAssignValue.trim())

        this.gridItems = gridItemTrack;

        if (!this.trackAssignValue) {
          this.gridItems = this.gridItemsOriginal;
        };
      }

      // this.getTrackReallocate();
    }

  }
  onVddlView(gridItem) {
    //  console.log(vddlDetail);
    var caseId = gridItem.VddlDetails.CaseId;
    // if(this.whichRoleActive == "Allocate"){
    //   //this.vddlData.vddlStorage = gridItem;
    //   caseId = gridItem.VddlDetails.CaseId;
    // }else{
    //   //this.vddlData.vddlStorage = gridItem.VddlDetails;
    //   caseId = gridItem.VddlDetails.caseId;
    // }
    this.vddlData.vddlStorage = gridItem;
    // this.vddlData.vddlStorage = gridItem.VddlDetails;
    // this.router.navigate(['/viewvddl',"false"]);
    this.router.navigate(['/viewvddl', { view: "allocateView", data: caseId }]);

  }




  getManagerAllocatedVDDL() {
    this.ciManageService.getManagerAllocatedVDDL()
      .subscribe(res => {
        if (res != null) {
          this.gridItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);



  }
}
