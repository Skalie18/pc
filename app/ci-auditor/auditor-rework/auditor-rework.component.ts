import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { LookUpService } from 'app/lookUp/lookup.service';
import { IAuditRequiredLKP, ITypeOfAuditLKP, IVddlLKP, ILKPClientName } from 'app/lookUp/lookup-interfaces';

import swal from 'sweetalert2';
import { AuditorClass, AuditPlanResult, CheckList } from '../auditor-class';
import { LookupAddress } from 'dns';
import { isError } from 'util';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import { Observable } from 'rxjs/Observable';
import { DocumentClass } from '../../shared-modules/document-upload/document-class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { DocumentViewerService } from '../../shared-services/document-viewer-service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';
import { CommentsViewDataService } from '../../shared-modules/comments-view/comments-view-data.service';
import { CommentsViewComponent } from 'app/shared-modules/comments-view/comments-view/comments-view.component';
import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import { Audit_ContraventionOffenceDetails, Audit_DutyVatDetails, AuditFindingsResult } from '../auditFinding';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ViewchangedatastoreService } from '../../providers/viewchangedatastore.service';


@Component({
  selector: 'app-auditor-rework',
  templateUrl: './auditor-rework.component.html',
  styleUrls: ['./auditor-rework.component.scss']
})
export class AuditorReworkComponent implements OnInit {
  caseID: any;
  auditlistItems: Array<any>[];
  hierarchMenuItems = [];
  errorMessage: String;
  audiDetails: AuditorClass = new AuditorClass();
  toggleCollection = [];
  resultData: any;
  vDLookup: Array<IVddlLKP>[];
  auditRequiredLookup = [];
  typeOfAuditLook: Array<ITypeOfAuditLKP>[];
  ClientNameAuditLook: Array<ILKPClientName>[];
  documentLetter: any;
  documentItems: Array<any> = new Array();
  commentsCaseId: String = '';
  repData: any;
  windowLabel: String;
  auditCaseType: string;
  Pending: Boolean = false;
  AuditFindings: AuditFindingsResult = new AuditFindingsResult();
  offenceDetails: Array<Audit_ContraventionOffenceDetails>[] = [];
  vatDetails: Array<Audit_DutyVatDetails>[] = [];
  currentvatDetail: Audit_DutyVatDetails = new Audit_DutyVatDetails();
  currentOffenceDetail: Audit_ContraventionOffenceDetails = new Audit_ContraventionOffenceDetails();
  currentvatDetailBeforeEdit: Audit_DutyVatDetails = new Audit_DutyVatDetails();
  currentOffenceDetailBeforeEdit: Audit_ContraventionOffenceDetails = new Audit_ContraventionOffenceDetails();
  AuditPlanId: string;
  currentUser: String;
  showDutyAndVatDueDisplayDialog: Boolean;
  displayDialogOffence: boolean;
  selectedAuditRequired: any[];
  allFieldsReadOnly: boolean = false;
  urlAction: string = '';
  isPostActionCompleted: boolean = false;
  isLoaded:boolean = true;

  constructor(private auditServices: AuditorTemplateService, private lookUpService: LookUpService,
    private storageDataAuditService: AuditDataproviderService, private dvservice: DocumentViewerService,
    private router: Router, private systemUser: SystemUserProviderService, private auditplanData: AuditPlanProviderService
    , private notesService: CommentsViewDataService
    , private pendCaseService: PendCaseDataService, private _router: ActivatedRoute, private storeData: ViewchangedatastoreService) {
    this.currentUser = systemUser.systemUserStorage.SID;
    this.getLookUpData();

    if (_router.snapshot.url.length > 0)
      this.urlAction = _router.snapshot.url[0].path;
  }

  ngOnInit() {
    this.toggleCollection = [{ Value: true, DisplayText: 'Yes' }, { Value: false, DisplayText: 'No' }];

    let _opendAuditPlan = this.auditplanData.auditPlanStroage;
    let _auditDataStorage = this.storageDataAuditService.auditDataStorage;

    if (_auditDataStorage) {
      this.caseID = _auditDataStorage.VddlDetails.CaseId;
      this.commentsCaseId = _auditDataStorage.VddlDetails.CaseId;
    }

    if (_opendAuditPlan) {
      this.documentItems = _opendAuditPlan.AuditDocuments.filter(x => x.IsRemoved != true); // documents
      this.audiDetails = _opendAuditPlan.AuditTemplate; // the actual template
      this.auditlistItems = _opendAuditPlan.CheckList; // these are checklist items.
      this.caseID = _opendAuditPlan.CaseId;
      this.commentsCaseId = _opendAuditPlan.CaseId;
      this.windowLabel = _opendAuditPlan.PlanStage;
      this.auditCaseType = _opendAuditPlan.CaseType;
      this.AuditPlanId = _opendAuditPlan.AuditTemplate.AuditPlanId;

      if (_opendAuditPlan.AuditFindingsResult) {
        this.AuditFindings = _opendAuditPlan.AuditFindingsResult;
      }

      //fix dates
      if (this.audiDetails.StartDate != null && this.audiDetails.StartDate.toString() != '0001-01-01T00:00:00')
        this.audiDetails.StartDate = new Date(this.audiDetails.StartDate);
      else
        this.audiDetails.StartDate = undefined;
      if (this.audiDetails.EndDate != null && this.audiDetails.EndDate.toString() != '0001-01-01T00:00:00')
        this.audiDetails.EndDate = new Date(this.audiDetails.EndDate);
      else
        this.audiDetails.EndDate = undefined;

      if (_opendAuditPlan.Pended == "findingspended")
        this.Pending = true;

      if (_opendAuditPlan.PlanStage != 'Audit Case Approval') {
        try {

          var lastKnownParentOrder = null;
          var lastKnownParentIndex = 0;

          this.hierarchMenuItems = [];
          var self = this;

          _opendAuditPlan.CheckList.forEach(function (menuItem, index) {
            if (index !== 0 && menuItem.SortOrder < lastKnownParentOrder) {

              if (menuItem.SortOrder === 1) {
                self.hierarchMenuItems[lastKnownParentIndex - 1].ChildMenuItems = [];
                self.hierarchMenuItems[lastKnownParentIndex - 1].Expandable = true;
              }
              self.hierarchMenuItems[lastKnownParentIndex - 1].ChildMenuItems.push(menuItem);
            }

            else {

              lastKnownParentOrder = menuItem.SortOrder;
              lastKnownParentIndex = lastKnownParentIndex + 1;
              self.hierarchMenuItems.push(menuItem);
            }

          });

        } catch (error) {
          swal("CheckListError", "Could not build question menu", "error");
        }

      }

    }


    if (this.windowLabel == 'Audit Findings Finalized') {
      this.allFieldsReadOnly = true;
    }
    else {
      this.allFieldsReadOnly = false;
    }

  }

  //#region Save/Update Methods

  getLookUpData() {
    this.lookUpService.getVddlLKP()
      .subscribe(res => {
        if (res != null) {
          this.vDLookup = res;
        }
      },
        error => this.errorMessage = <any>error);

    this.lookUpService.getAuditRequiredLKP()
      .subscribe(res => {
        if (res != null) {
          this.auditRequiredLookup = [];
          res.forEach(element => {
            this.auditRequiredLookup.push({ label: element.Description, value: { AuditRequiredId: element.AuditRequiredId } });

          });
          var self = this;
          var auditArray = [];
          if (self.audiDetails.AuditRequiredId != null) {
            auditArray = self.audiDetails.AuditRequiredId.split(',');
          }

          this.selectedAuditRequired = this.auditRequiredLookup.filter(function (elementx) {
            var found = false;
            if (self.audiDetails.AuditRequiredId != null) {
              if (auditArray.length > 0) {
                self.selectedAuditRequired = [];
                auditArray.forEach((elementt, index) => {
                  if (elementt == elementx.value.AuditRequiredId)
                    found = true;
                });
              }
            }

            return found
          }).map(a => a.value);
        }

      },
        error => this.errorMessage = <any>error);

    this.lookUpService.getTypeOfAuditLKP()
      .subscribe(res => {
        if (res != null) {
          this.typeOfAuditLook = res;
        }
      },
        error => this.errorMessage = <any>error);

    this.lookUpService.getClientNameLKP()
      .subscribe(res => {
        if (res != null) {
          this.ClientNameAuditLook = res;
        }
      },
        error => this.errorMessage = <any>error);

  }


  getDocumentGenerationLetter(letterType) {
    let audtDocLetter = new DocumentClass();
    audtDocLetter.CaseId = this.caseID;
    audtDocLetter.UploadedBy = this.systemUser.systemUserStorage.SID;
    audtDocLetter.DocumentType = letterType;

    if (this.AuditFindings.DutyVatDetails.filter(x => x.IsRemoved != true).length < 1) {
      swal("There must be at least 1 Duty/Vat Due", "", "error");
      return;
    }
    if (this.AuditFindings.ContraventionOffenceDetails.filter(x => x.IsRemoved != true).length < 1) {
      swal("There must be at least 1 Offence detail", "", "error");
      return;
    }
    audtDocLetter.DocumentContent = JSON.stringify(this.AuditFindings);

    this.isPostActionCompleted = true;
    this.auditServices.getDocumentGenerationLetter(audtDocLetter)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        if (res != null) {
          if (res.Success == 1) {
            if (!this.documentItems) {
              this.documentItems = [];
            }
            this.documentItems.push(res.Document);
            // this.documentLetter = res;
          }
          else {
            swal(res.Message, "", "error");
          }
        }
      },
        error => {
          this.isPostActionCompleted = false;
          this.handleError(error);
          this.errorMessage = <any>error
        });
  }

  onCancel() {
    this.storageDataAuditService.auditDataPlanStorage = null;
    this.router.navigate(['/dashboard']);
  }


  ReworkPlan() {
    //Add in note functionality before allow Reject
    //
    var that = this;  // This is important as you need to pass this in to sub functions
    this.AddNote().then(
      function () {
        this.isPostActionCompleted = true;
        that.auditServices.submitReworkPlan(that.getAuditPlanResult())
          .subscribe(res => {
            this.isPostActionCompleted = false;
            that.resultData = res;
            if (that.resultData == "1") {
              swal(
                'AuditPlan',
                'Audit submitted for rework',
                'success'
              );
              that.onCancel();
            }

            else {
              swal(
                'AuditPlan',
                'failed to submit audit plan for rework - ' + res,
                'error'
              );
            }
          },
            error => {
              this.isPostActionCompleted = false;
              that.errorMessage = <any>error;
              swal(
                'AuditPlan',
                that.errorMessage.toString(),
                'error'
              );
            });
      });
  }

  ApprovePlan() {
    this.isPostActionCompleted = true;
    this.auditServices.submitApprovePlan(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Plan Successfully Approved',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'AuditPlan',
            'failed to submit audit plan for approval - ' + res,
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }


  RejectPlan() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                var that = this;
                if (result.value) {
                  that.auditServices.submitRejectPlan(that.getAuditPlanResult())
                    .subscribe(res => {
                      that.resultData = res;
                      if (that.resultData == "1") {
                        swal(
                          'AuditPlan',
                          'Audit Plan Successfully Rejected',
                          'success'
                        );
                        that.onCancel();
                      }
                      else {
                        swal(
                          'AuditPlan',
                          'failed to submit audit plan for rejection - ' + res,
                          'error'
                        );
                      }
                    },
                      error => this.errorMessage = <any>error);

                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => {
            this.isPostActionCompleted = false;
             swal('Did not Save', <any>error, 'error');
            })
      } else {
        this.commentsCaseId = this.caseID;

      }
    })

  }
  AddNote() {
    var that = this;
    return new Promise(async function (resolve, reject) {
      that.commentsCaseId = null;
      swal({
        input: 'textarea',
        title: 'Add Note',
        showCancelButton: true,
        confirmButtonText: 'Save Note'
      }).then((result) => {
        if (result.value) {
          this.isPostActionCompleted = true;
          that.notesService.savenote(that.caseID, result.value)
            .subscribe(res => {
              this.isPostActionCompleted = false;
              console.log(res);
              that.repData = res;
              if (that.repData != "0") {
                that.commentsCaseId = that.caseID;
                resolve();
              }
            }, error => swal('Did not Save', <any>error, 'error')
            )
        } else {
          that.commentsCaseId = that.caseID;
        }
      })

    });
  }

  getAuditPlanResult() {
    let auditPlanResult = new AuditPlanResult();
    auditPlanResult.AuditDocuments = this.documentItems;
    auditPlanResult.AuditTemplate = this.audiDetails;
    auditPlanResult.CaseId = this.caseID;
    auditPlanResult.IsEdit = this.storageDataAuditService.auditDataPlanStorage == null ? false : true;
    auditPlanResult.AuditFindingsResult = this.AuditFindings;
    auditPlanResult.AuditFindingsResult.AuditorFindings.AuditPlanId = this.AuditPlanId;
    auditPlanResult.AuditFindingsResult.FindingsAddress.AuditPlanId = this.AuditPlanId;

    if (this.windowLabel === "Execute Audit Case Findings") {
      auditPlanResult.CheckList = [];
      this.hierarchMenuItems.forEach(element => {
        auditPlanResult.CheckList.push(element);

        if (element.ChildMenuItems && element.ChildMenuItems.length > 0) {
          element.ChildMenuItems.forEach(childElement => {
            auditPlanResult.CheckList.push(childElement);
          });
        }
      });
    }
    else {
      auditPlanResult.CheckList = this.auditlistItems;
    }

    var auditArray = [];
    if (this.selectedAuditRequired != null && this.selectedAuditRequired.length > 0) {
      this.selectedAuditRequired.forEach(element => {
        auditArray.push(element.AuditRequiredId);
      });
      auditPlanResult.AuditTemplate.AuditRequiredId = auditArray.join(",");
    }

    return auditPlanResult;
  }


  //#endregion


  //#region Execute Findigs

  ReportCheckList() {


  }



  SubmitExecuteReview() {
    this.isPostActionCompleted = true;
    this.auditServices.submitExecuteReview(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Execute findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  //#endregion


  //#region Review Findings

  // ReworkFindings() {

  //   this.auditServices.reworkFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully reworked',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //           'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });

  // }

  ReworkFindings() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                if (result.value) {
                  this.isPostActionCompleted = true;
                  this.auditServices.reworkFindings(this.getAuditPlanResult())
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.resultData = res;
                      if (this.resultData == "1") {
                        swal(
                          'Execute Findings',
                          'Audit case findings successfully reworked',
                          'success'
                        );
                        this.onCancel();
                      }

                      else {
                        swal(
                          'Failed to submit',
                          'please verify if all the required information is captured on the case',
                          'error'
                        );
                      }

                    },
                      error => {
                        this.isPostActionCompleted = false;
                        this.errorMessage = <any>error;
                        swal(
                          'AuditPlan',
                          this.errorMessage.toString(),
                          'error'
                        );
                      })
                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.caseID;

      }
    })

  }

  // ReworkLetterIntentFindings() {

  //   this.auditServices.reworkLetterIntentFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully reworked',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //            'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });

  // }


  ReworkLetterIntentFindings() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                if (result.value) {
                  this.isPostActionCompleted = true;
                  this.auditServices.reworkLetterIntentFindings(this.getAuditPlanResult())
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.resultData = res;
                      if (this.resultData == "1") {
                        swal(
                          'Execute Findings',
                          'Audit case findings successfully reworked',
                          'success'
                        );
                        this.onCancel();
                      }

                      else {
                        swal(
                          'Failed to submit',
                          'please verify if all the required information is captured on the case',
                          'error'
                        );
                      }

                    },
                      error => {
                        this.isPostActionCompleted = false;
                        this.errorMessage = <any>error;
                        swal(
                          'AuditPlan',
                          this.errorMessage.toString(),
                          'error'
                        );
                      });
                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.caseID;

      }
    })
  }
  // ReworkLetterDemandFindings() {

  //   this.auditServices.reworkDemandLetterFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully reworked',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //           'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });

  // }


  AcceptFindings() {
    this.isPostActionCompleted = true;
    this.auditServices.acceptFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  SubmitApproveIntentLetter() {
    this.isPostActionCompleted = true;
    this.auditServices.SubmitApproveIntentLetter(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  SubmitDemandIntentLetter() {
    this.isPostActionCompleted = true;
    this.auditServices.SubmitApproveDemandLetter(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  ApproveDemandLetter() {
    this.isPostActionCompleted = true;
    this.auditServices.ApproveDemandLetter(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }

  ApproveIntentLetter() {

    this.isPostActionCompleted = true;
    this.auditServices.ApproveIntentLetter(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }

  // RejectFindings() {

  //   this.auditServices.rejectFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully rejected',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //           'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });
  // }



  RejectFindings() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                if (result.value) {
                  this.isPostActionCompleted = true;
                  this.auditServices.rejectFindings(this.getAuditPlanResult())
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.resultData = res;
                      if (this.resultData == "1") {
                        swal(
                          'Execute Findings',
                          'Audit case findings successfully rejected',
                          'success'
                        );
                        this.onCancel();
                      }

                      else {
                        swal(
                          'Failed to submit',
                          'please verify if all the required information is captured on the case',
                          'error'
                        );
                      }

                    },
                      error => {
                        this.isPostActionCompleted = false;
                        this.errorMessage = <any>error;
                        swal(
                          'AuditPlan',
                          this.errorMessage.toString(),
                          'error'
                        );
                      });

                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.caseID;

      }
    })

  }


  // RejectLetterIntentFindings() {

  //   this.auditServices.rejectIntentLetterFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully rejected',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //           'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });
  // }

  RejectLetterIntentFindings() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                if (result.value) {

                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => { 
            this.isPostActionCompleted = false;
            swal('Did not Save', <any>error, 'error') }
          )
      } else {
        this.commentsCaseId = this.caseID;

      }
    })

  }



  // RejectDemandLetterFindings() {

  //   this.auditServices.rejectDemandLetterFindings(this.getAuditPlanResult())
  //     .subscribe(res => {
  //       this.resultData = res;
  //       if (this.resultData == "1") {
  //         swal(
  //           'Execute Findings',
  //           'Audit case findings successfully rejected',
  //           'success'
  //         );
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Failed to submit',
  //           'please verify if all the required information is captured on the case',
  //           'error'
  //         );
  //       }

  //     },
  //       error => {
  //         this.errorMessage = <any>error;
  //         swal(
  //           'AuditPlan',
  //           this.errorMessage.toString(),
  //           'error'
  //         );
  //       });
  // }


  RejectDemandLetterFindings() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: false,
      confirmButtonText: 'Save Note',
      allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
    }).then((result) => {
      if (result.value) {
        this.isPostActionCompleted = true;
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {

              swal({
                title: 'Record',
                text: 'Note Saved Successfully',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
              }).then((result) => {
                if (result.value) {
                  this.isPostActionCompleted = true;
                  this.auditServices.rejectDemandLetterFindings(this.getAuditPlanResult())
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.resultData = res;
                      if (this.resultData == "1") {
                        swal(
                          'Execute Findings',
                          'Audit case findings successfully rejected',
                          'success'
                        );
                        this.onCancel();
                      }

                      else {
                        swal(
                          'Failed to submit',
                          'please verify if all the required information is captured on the case',
                          'error'
                        );
                      }

                    },
                      error => {
                        this.isPostActionCompleted = false;
                        this.errorMessage = <any>error;
                        swal(
                          'AuditPlan',
                          this.errorMessage.toString(),
                          'error'
                        );
                      });

                }

              })

              this.commentsCaseId = this.caseID;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.caseID;

      }
    })

  }
  //#endregion



  //#region FinalizeFindings

  finalizeFindings() {
    this.isPostActionCompleted = true;
    this.auditServices.finalizeFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully finalized',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }

  CloseFindings() {
    this.isPostActionCompleted = true;
    this.auditServices.closeFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully finalized',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  //#endregion


  //#region Rejection

  DisapprovedRejection() {
    this.isPostActionCompleted = true;
    this.auditServices.disapproveRejection(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully disapproved',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  ApproveRejection() {
    this.isPostActionCompleted = true;
    this.auditServices.approveRejection(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully approved',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to submit',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  SaveFindings() {
    this.isPostActionCompleted = true;
    this.auditServices.saveCompleteAuditPlanAllInOne(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Plan Successfully Approved',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Failed to save',
            'please verify if all the required information is captured on the case',
            'error'
          );
        }

      },
        error => {
          this.isPostActionCompleted = false;
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }

  //#endregion

  //#region Letter Generation
  loadDoc(e, file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }

  uploadFile(event: any) {
    let file = event.target.files;

    for (var index = 0; index < file.length; index++) {
      var fName = file[index].name;
      var fSize = file[index].size;
      let doc = new DocumentClass;
      this.loadDoc(event, file[index]).subscribe((f) => {
        doc.DocumentContent = f;
        doc.FileName = fName;
        doc.FileSize = fSize;
        doc.IsRemoved = false;
      });
      this.documentItems.push(doc);
      event.target.value = "";

    }
  }

  removeDocument(documentItem, dt: DataTable) {

    documentItem.IsRemoved = true;
    dt.filter('false', 'IsRemoved', 'equals');

    // this.documentItems[index].IsRemoved = true;
    //Dont splice as the Isremoved will take the item off the screen and then get saved back to the db
    //this.documentItems.splice(index, 1);  
  }

  viewDocument(documentItem) {
    var document = documentItem;
    var documentContent = document.DocumentContent;

    if (documentContent.toString() !== '' && documentContent !== undefined) {
      var result = this.dvservice.getpdfdocument(documentContent.toString());
      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For Internet explorer
        window.navigator.msSaveOrOpenBlob(result, document.FileName);
      }
      else {
        var url = window.URL.createObjectURL(result);
        window.open(url);

      }
    }
    else {
      // alert('Document Did not load Properly');
    }
  }
  //#endregion


  onToggleChange(sender, type) {
    var chosenValue = sender.target.value;
    if (chosenValue) {
      var value = chosenValue.split(':')
      if (value.length > 1) {
        switch (type) {
          case 'IsTraderPreviouslyAudited':
            {
              if (value[1].trim() == 'true') {
                swal('Audit Findings', 'Request what action if any should be taken with respect to the audit activity', 'info');
                break;
              }
            }

          case 'IsExistingAuditOrInvestigation':
            {
              if (value[1].trim() == 'true') {
                swal('Audit Findings', 'Request what action if any should be taken with respect to the audit activity', 'info');
                break;
              }
            }

          case 'IsThereAnExistingAudit':
            {
              if (value[1].trim() == 'true') {
                swal('Audit Findings', 'Check for potential non-compliance', 'info');
                break;
              }
            }

        }
      }
    }
  }


  viewVddl() {
    if (this.auditCaseType == 'Voluntary Disclosure/Demand Led') {
      this.router.navigate(['/viewvddl', { view: "approvedauditplansview", data: this.caseID }]);
      this.storeData.datastore = this.audiDetails;
    }
    else if (this.auditCaseType == 'Risk Assessment Report') {
      this.router.navigate(['/createcrcs', { view: 'Findings', data: this.caseID, role: this.urlAction }]);
      this.storeData.datastore = this.audiDetails;
    }

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
          swal('Pend Result', 'Pend Case failed: <br>Weekend Not Allowed', 'error');
        }
        else {
          this.pendCaseService.onPendCase(this.caseID, selectedDate)
            .then(
              this.router.navigate(['/dashboard']))
            .catch(
              swal("Failed to pend case", "Case did not pend, please try again later", "error")
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
          this.pendCaseService.onUnPendCase(this.caseID)
            .then(
              this.router.navigate(['/dashboard'])
            ).catch(
              swal("Failed to unpend case", "Case did not unpend, please try again later", "error")
            )
        }
      })
  }


  onOffenceEdit(item) {
    if (this.AuditFindings.ContraventionOffenceDetails != null && this.AuditFindings.ContraventionOffenceDetails.length > 0) {
      if (item.SectionRuleContravened && item.Circumstance && item.Offence) {
        var temp = this.AuditFindings.ContraventionOffenceDetails.filter(x => x == this.currentOffenceDetailBeforeEdit);
        if (temp.length == 1) {
          temp = item;
        }
        this.currentOffenceDetailBeforeEdit = new Audit_ContraventionOffenceDetails();
        this.currentOffenceDetail = new Audit_ContraventionOffenceDetails();
        this.displayDialogOffence = false;
      }
    }
  }

  addOffenceDetails(item) {

    if (item.SectionRuleContravened && item.Circumstance && item.Offence) {
      item.IsRemoved = false;
      item.AuditPlanId = this.AuditPlanId;
      item.OffenceDetailsId = null;
      if (!this.AuditFindings.ContraventionOffenceDetails) {
        this.AuditFindings.ContraventionOffenceDetails = [];
      }
      this.AuditFindings.ContraventionOffenceDetails.push(item);
      this.currentOffenceDetail = new Audit_ContraventionOffenceDetails();
      this.displayDialogOffence = false;
    }
  }

  onVatDetailsEdit(item) {
    if (this.AuditFindings.DutyVatDetails != null && this.AuditFindings.DutyVatDetails.length > 0) {
      if (item.DeclarationNumber && item.LineNumber && item.TypeOfDutyTaxUnderPaid && item.Amount) {
        var temp = this.AuditFindings.DutyVatDetails.filter(x => x == this.currentvatDetailBeforeEdit);
        if (temp.length == 1) {
          temp = item;
        }
        this.currentvatDetailBeforeEdit = new Audit_DutyVatDetails();
        this.currentvatDetail = new Audit_DutyVatDetails();
        this.showDutyAndVatDueDisplayDialog = false;
      }
    }
  }

  addVatDetails(item) {

    if (item.DeclarationNumber && item.LineNumber && item.TypeOfDutyTaxUnderPaid && item.Amount) {
      item.IsRemoved = false;
      item.AuditPlanId = this.AuditPlanId;
      item.DutyVatDetailsId = null;
      if (!this.AuditFindings.DutyVatDetails) {
        this.AuditFindings.DutyVatDetails = [];
      }
      this.AuditFindings.DutyVatDetails.push(item);
      this.currentvatDetail = new Audit_DutyVatDetails();
      this.showDutyAndVatDueDisplayDialog = false;
    }

  }

  onVatDetailsGridEdit(item) {

    this.currentvatDetail = item;
    this.currentvatDetailBeforeEdit = item;
    this.showDutyAndVatDueDisplayDialog = true;
  }

  onDeleteVatDetails(item, dt: DataTable) {
    item.IsRemoved = true;
    dt.filter('false', 'IsRemoved', 'equals');
  }

  onOffenceDetailsGridEdit(item) {
    this.currentOffenceDetail = item;
    this.currentOffenceDetailBeforeEdit = item;
    this.displayDialogOffence = true;
  }

  onDeleteOffenceDetails(item, dt: DataTable) {
    item.IsRemoved = true;
    dt.filter('false', 'IsRemoved', 'equals');
  }


  showDutyAndVatDueDialog() {

    this.currentvatDetail = new Audit_DutyVatDetails();
    this.currentvatDetailBeforeEdit = new Audit_DutyVatDetails();
    this.showDutyAndVatDueDisplayDialog = true;
  }

  showOffenceDialog() {

    this.currentOffenceDetail = new Audit_ContraventionOffenceDetails();
    this.currentOffenceDetailBeforeEdit = new Audit_ContraventionOffenceDetails();
    this.displayDialogOffence = true;
  }


  DocumentsLength() {
    if (this.documentItems !== null ) {
      return this.documentItems.filter(x => !x.IsRemoved).length;
    } else {
      return 0;
    }
  }


  handleError(message: any) {
    this.isPostActionCompleted = false;
    let m = JSON.stringify(message);
    let _body = JSON.parse(m)._body;
    let exceptionmessage = JSON.parse(_body).ExceptionMessage;
    if (exceptionmessage !== undefined && exceptionmessage !== null) {
      swal("Document Generation Error ", exceptionmessage, "error");
    }
  }
}
