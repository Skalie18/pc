import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { IVddl } from '../vd-dl-interface';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { VdDlDataService } from 'app/client-interface/vd-dl-data.service';
import { VdDlClass } from 'app/client-interface/vd-dl-class';
import swal from 'sweetalert2';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";

import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import 'rxjs/add/operator/pairwise';
import { IncometaxValidationService } from '../../shared-services/validations/incometax-validation.service';
import { VatValidationService } from '../../shared-services/validations/vat-validation.service';



import { FormGroup, Validators, FormControl } from "@angular/forms";


@Component({
  selector: 'app-client-interface',
  templateUrl: './client-interface.component.html',
  styleUrls: ['./client-interface.component.scss'],

})

export class ClientInterfaceComponent implements OnInit {

  clientForm: FormGroup;
  Vddl: IVddl;
  vddlData: VdDlClass = new VdDlClass();
  errorMessage: string;
  repData: any;

  viewTitle: String;

  originCaseList: any;
  customsExciseLists: any;
  statusValue: String;
  commentsCaseId: String = '';
  fromView: String;
  caseIdFromView: String;
  role: String;
  userRole: String;

  //Button Visibility 
  SaveButton: boolean;
  SubmitButton: boolean;
  CancelButton: boolean;
  AddNoteButton: boolean;
  PendButton: boolean;
  UnpendButton: boolean;
  BackButton: boolean;
  Selected: String;
  isPostActionCompleted: boolean = false;
  isLoaded:boolean = true;


  constructor(private data: vddlDataProvider, private _vddlService: VdDlDataService, private _router: Router, private router: ActivatedRoute, private systemUser: SystemUserProviderService, private uploadedDocs: DocumentUploadProviderService, private notesService: CommentsViewDataService, private pendCaseService: PendCaseDataService, private incomeValService: IncometaxValidationService, private vatValService: VatValidationService) {
    this.onGetOriginCase();
    this.getCustomsExcise();
    // router.snapshot.data[1];
    // 
    this.userRole = this.systemUser.systemUserStorage.Role;
    this.fromView = router.snapshot.params["view"];
    this.caseIdFromView = router.snapshot.params["data"];
    this.role = router.snapshot.params["role"];
    this.Selected = router.snapshot.params["value"];
  }


  ngOnInit() {
    // this.clientForm = new FormGroup({
    //   'incomeTax': new FormControl(this.vddlData.VddlDetails.IncomeTax,[ 
    //       Validators.required          
    //   ])        
    // })
    if (this.fromView == "auditPlan" || this.fromView == "approvedauditplansview" || this.fromView == "auditpending" || this.fromView == "allocateView") {
      this.viewTitle = "View VD/DL"
      this.getVddlFormByCaseId();
    } else {
      if (this.data.vddlStorage && this.data.vddlStorage.VddlDetails != null) {
        this.viewTitle = "Edit VD/DL ";
        this.vddlData.VddlDetails = this.data.vddlStorage.VddlDetails;
        this.uploadedDocs.documentUploadStroage = this.data.vddlStorage.UploadedFiles;
        this.commentsCaseId = this.vddlData.VddlDetails == null ? '' : this.vddlData.VddlDetails.CaseId;

      } else {
        this.statusValue = "New";
        this.viewTitle = "Create New VD/DL";
        this.vddlData.VddlDetails;

      }
    }
    this.setButtonsVisible();
  }

  setButtonsVisible() {
    switch (this.fromView) {
      case "auditPlan":
        this.SubmitButton = false;
        this.CancelButton = false;
        this.AddNoteButton = false;
        this.BackButton = true;
        this.AddNoteButton = false;
        if (this.vddlData.VddlDetails.CaseId != null || this.caseIdFromView != null) {
          this.PendButton = true;
        }
        break;
      case "approvedauditplansview":
        this.SubmitButton = false;
        this.CancelButton = false;
        this.BackButton = true;
        this.AddNoteButton = false;
        this.SaveButton = false;
        if (this.vddlData.VddlDetails.CaseId != null || this.caseIdFromView != null) {
          this.PendButton = true;
        }
        break;
      case "allocateView":
        this.SubmitButton = false;
        this.SaveButton = false;
        this.AddNoteButton = false;
        this.BackButton = true;
        this.AddNoteButton = false;
        if (this.vddlData.VddlDetails.CaseId != null || this.caseIdFromView != null) {
          this.PendButton = true;
        }
        break;
      case "auditpending":
        this.BackButton = true;
        this.AddNoteButton = true;
        this.UnpendButton = true;
        break;
      case "workinprogress":
        this.SaveButton = true;
        this.SubmitButton = true;
        this.CancelButton = true;
        this.AddNoteButton = true;
        this.BackButton = true;
        break;
      default:
        this.SaveButton = true;
        this.SubmitButton = true;
        this.CancelButton = true;
        break;
    }
  }

  onCancel() {
    // clear fields
    if (this.data.vddlStorage) {
      this.data.vddlStorage.VddlDetails = null;
    }

    this._router.navigate(['/dashboard']);

  }

  onSave(vddlDetail) {

    this.vddlData.VddlDetails.Sid = this.systemUser.systemUserStorage.SID;
    this.vddlData.VddlDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    if (this.vddlData.VddlDetails.CaseId == null) {
      this.vddlData.IsEdit = false;
    } else {
      vddlDetail.IsEdit = true;

    }

    this.vddlData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    // this.vddlData.UploadedFiles[0].DocumentContent = null;

    if (this.fromView != 'approvedauditplansview' && this.vddlData.IsEdit == false) {

      swal({
        title: 'Information',
        text: "VD/DL information in WIP for only 48 hours, do you want to continue saving?",
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.SaveHelper(vddlDetail);
        }
      })
    }

    else {

      this.SaveHelper(vddlDetail);
    }

  }


  SaveHelper(vddlDetail) {
    this.isPostActionCompleted = true;
    this._vddlService.addVddl(this.vddlData)
      .subscribe(res => {
        console.log(res);
        this.isPostActionCompleted = true;
        this.repData = res;

        if (this.repData != null && this.repData.Success == "1") {
          if (vddlDetail.IsEdit == true) {

            swal({ type: 'success', title: 'Record', text: "VD/DL Updated  Successfully", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

          } else {

            swal({ type: 'success', title: 'Record', text: "VD/DL Saved Successfully and case ref No. is :" + this.repData.Message + "", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })


          }

          this.vddlData = new VdDlClass();
          this.uploadedDocs.documentUploadStroage = null;
          if (this.fromView == "auditPlan") {

            this._router.navigate(["/createauditplan"]);

          } else if (this.Selected == "59697a4d-4996-494b-8b09-a075d54a618c") {

            this._router.navigate(["/createauditplan", { view: "vddlview", role: "donotinitagian" }]);
          }
          else {
            this.onCancel();
          }

        }

        else {
          swal(
            'Record',
            'Failed to save VD/DL - ' + res,
            'error'
          )
          swal({ type: 'error', title: 'Record', text: "'Failed to save VD/DL - " + res + "", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

        }

      },
        error => this.errorMessage = <any>error);
  }


  onsubmit(vddlDstail) {
  
    this.vddlData.VddlDetails.Sid = this.systemUser.systemUserStorage.SID;
    this.vddlData.VddlDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    this.vddlData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.isPostActionCompleted = true;
    this._vddlService.submitVddl(vddlDstail)
      .subscribe(any => {
        this.isPostActionCompleted = false;
        this.repData = any;
        if (this.repData != null && this.repData.Success == "1") {
          // swal(
          //   'Record',
          //   'VD/DL Submitted Successfully and case ref No. is : ' + this.repData.Message,
          //   'success'
          // )
          swal({ type: 'success', title: 'Record', text: "VD/DL Submitted Successfully and case ref No. is :" + this.repData.Message + "", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

        }
        this.vddlData = new VdDlClass();
        this.uploadedDocs.documentUploadStroage = null;
        this.onCancel();
      },
        error => this.errorMessage = <any>error);
  }

  onGetOriginCase() {
    this._vddlService.getOriginoCase()
      .subscribe(originCaseList => {
        this.originCaseList = originCaseList;
      },
        error => this.errorMessage = <any>error);

  }

  getCustomsExcise() {
    this._vddlService.getCustomsExcise()
      .subscribe(res => {
        this.customsExciseLists = res.filter(y => y.Description != "Excise");

      },
        error => this.errorMessage = <any>error);

  }

  onAddNote() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: true,
      confirmButtonText: 'Save Note'
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.vddlData.VddlDetails.CaseId, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {
              // swal(
              //   'Record',
              //   'Note Saved Successfully',
              //   'success'
              // );
              swal({ type: 'success', title: 'Record', text: 'Note Saved Successfully', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })


              this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
      }
    });
  }

  onPend() {
    var dateFormat = require('dateformat');
    var today = new Date;
    today.setDate(today.getDate() + 1);

    today = dateFormat(today, 'yyyy-mm-dd')
    swal({
      title: 'Pend Case',
      html: 'Select date to pend case: <input type="date" id="datepicker" value="' + today + '" min="' + today + '"  >',
      //        onOpen: function() {$('#datepicker').datepicker();},
      type: 'question'
    }).then((result) => {
      if (result.value) {
        var selectedDate = new Date((document.getElementById('datepicker') as HTMLInputElement).value);
        //         var selectedDate =new Date($('#datepicker').val());
        var day = selectedDate.getDay();
        if (day === 0 || day == 6) {
          // swal('Pend Result', 'Pend Case failed: <br>Weekend Not Allowed', 'error');
          swal({ type: 'error', title: 'Pend Result', text: 'Pend Case failed: <br>Weekend Not Allowed', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })


        }
        else {
          this.pendCaseService.onPendCase(this.vddlData.VddlDetails.CaseId, selectedDate)
            .then(
              this._router.navigate(['/dashboard']))
            .catch(
              // swal("Failed to pend case", "Case did not pend, please try again later", "error")
              swal({ type: 'error', title: 'Failed to pend case', text: 'Case did not pend, please try again later', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

            );
        }
      }
    }
    )
  }

  onUnPend() {
    swal({
      title: 'Confirm Unpend',
      text: 'Are you sure you want to unpend this case',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
      .then((result) => {
        if (result.value) {
          this.pendCaseService.onUnPendCase(this.vddlData.VddlDetails.CaseId)
            .then(
              this._router.navigate(['/vddlpended', { pended: "true" }])
            ).catch(
              // swal("Failed to unpend case", "Case did not unpend, please try again later", "error")
              swal({ type: 'error', title: 'Failed to pend case', text: 'Case did not pend, please try again later', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

            )
        }
      })
  }

  getVddlFormByCaseId() {
    this._vddlService.getVddlFormByCaseId(this.caseIdFromView)
      .subscribe(res => {
        if (res != null) {
          this.vddlData.VddlDetails = res.VddlDetails;
          this.uploadedDocs.documentUploadStroage = res.UploadedFiles;
          this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }



  goBack() {
    switch (this.fromView) {
      case "auditPlan":
        this._router.navigate(["/createauditplan", { view: "vddlview", role: "donotinitagian" }]);
        break;
      case "approvedauditplansview":
        this._router.navigate(["/auditplanworrework"]);
        break;
      case "allocateView":
        if (this.role == 'ReAllocate') {
          this._router.navigate(["/cimanagerReallocate"]);
        } else {
          this._router.navigate(["/cimanagerAllocate"]);
        }
        break;
      case "auditpending":
        this._router.navigate(['/vddlpended', { pended: "true" }])
        break;
      case "workinprogress":
        this._router.navigate(["/vddlworkinprogress"]);
        break;
      default:
        this._router.navigate(["/dashboard"]);
        break;
    }
  }
}
