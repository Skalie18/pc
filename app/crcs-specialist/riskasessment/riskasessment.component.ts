import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRiskAssessment } from '../risk-assessment';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { RiskAssessmentClass, RiskAssessmentReportCase } from 'app/crcs-specialist/risk-assessment-class';
import { RegistrationParticularsClass } from 'app/crcs-specialist/registration-particulars-class';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { CustomsTurnOverDetailsClass } from 'app/crcs-specialist/customs-turnover-details-class';
import { DirectorDetailsClass } from 'app/crcs-specialist/director-details-class';
import { IRiskStatementInterface } from '../risk-statement-interface';
import { CustomsRASParticularsClass } from '../customs-particulars-class';
import { RiskStatementClass } from '../risk-statement-class';
import { PagerService } from '../../shared-services/pager.service';
import { UpdateDatagridService } from '../../shared-services/update-datagrid.service';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import swal from 'sweetalert2';
import { CommentsViewDataService } from 'app/shared-modules/comments-view/comments-view-data.service';

import { PendCaseDataService } from 'app/shared-services/pend-case/pend-case-data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SarClass } from '../../user/sar-class';
import { SarProvider } from '../../user/sar-provider';
import { SystemUserProviderService } from '../../system-user-provider.service';



@Component({
  selector: 'app-riskasessment',
  templateUrl: './riskasessment.component.html',
  styleUrls: ['./riskasessment.component.scss']
})

export class RiskasessmentComponent implements OnInit {
  riskAssessment: IRiskAssessment;
  registrationParticularsClass: RegistrationParticularsClass = new RegistrationParticularsClass();

  customsParticularsClass: CustomsRASParticularsClass = new CustomsRASParticularsClass();
  customsTurnOverDetailsClass: CustomsTurnOverDetailsClass = new CustomsTurnOverDetailsClass();
  directorDetailsClass: DirectorDetailsClass = new DirectorDetailsClass();
  riskAssessmentData: RiskAssessmentClass = new RiskAssessmentClass();
  riskkAssessmentCombinedData: RiskAssessmentReportCase = new RiskAssessmentReportCase();


  riskStatement: RiskStatementClass = new RiskStatementClass();
  riskStatementBeforeEdit: RiskStatementClass = new RiskStatementClass();
  CurrentEditIndex: Number = 0;

  riskArealist: Array<any>;
  riskRatingsLikelihoodList: Array<any>;
  riskRatingsConcernedList: Array<any>;
  HSChapterAppliedList: Array<any>;
  industryList: Array<any>;
  RA_Approval: Boolean;
  RA_Fields: Boolean;

  errorMessage: string;
  repData: any;
  items: Array<any>;
  viewTitle: String;
  originCaseList: any;
  statusValue: String;

  EntityIndex: Number;

  pageNumber: Number = 0;
  currentIndex: Number = 1;
  pagesIndex: Array<Number>;
  SarRefIndex: Number;
  Approval_Status: String;
  commentsCaseId: String = '';
  caseID: string;
  IBRnumber: string = '';
  toggleCollection = [];
  caseIdFromView: string;
  enableBackNavigation: boolean = false;
  CaseStatus: String;
  IstechReview: boolean = false;
  actionMestertechreview: string;

  fromView: String;
  technicalReviewButton: String;
  displayDialog: boolean;
  directorDetailsDisplayDialog: boolean;
  customersTurnoverDisplayDialog: boolean;
  customersRegDisplayDialog: boolean;
  riskStatementDisplayDialog: boolean;
  userRole: String;
  allFieldsReadOnly: boolean = false;
  urlrole: string = '';
  isPostActionCompleted: boolean = false;
  isLoaded:boolean = true;

  constructor(private data: DataProvider, private sardata: SarProvider, private notesService: CommentsViewDataService,
    private _riskAssessmentService: RiskAssessmentService,
    private uploadedDocs: DocumentUploadProviderService, private updateData: UpdateDatagridService,
    private pagerService: PagerService, private _router: Router, private router: ActivatedRoute, private systemUser: SystemUserProviderService, ) {

    this.onRiskAssessment();
    this.onRiskRatingsLikelihood();
    this.onRiskRatingsConcerned();
    this.onHSChapterApplied();
    this.onIndustry();
    this.onGetOriginCase();

    this.RA_Approval = this._riskAssessmentService.RA_Approval;
    this.RA_Fields = this._riskAssessmentService.RA_Fields;

    this.fromView = router.snapshot.params["view"];
    this.urlrole = router.snapshot.params["role"];
    this.userRole = this.systemUser.systemUserStorage.Role;
  }

  ngOnInit() {
    this.caseIdFromView = this.router.snapshot.params["data"];

    if (this.caseIdFromView) {
      this.viewTitle = this.router.snapshot.params["view"];
      this.enableBackNavigation = true;
      this.getRAFormByCaseId();
    }
    else {
      if (this.data.riskAssessmentStorage) {
        this.riskkAssessmentCombinedData = this.data.riskAssessmentStorage;
        this.riskAssessmentData = this.data.riskAssessmentStorage.RiskAssessmentReportResult;
        this.uploadedDocs.documentUploadStroage = this.riskkAssessmentCombinedData.UploadedFiles;
        this.riskkAssessmentCombinedData.IsEdit = true;
        //this.viewTitle = this.riskkAssessmentCombinedData.Stage;
        this.effectCaseProcess(this.riskkAssessmentCombinedData.Stage);
        this.commentsCaseId = this.riskAssessmentData.CaseId;
        this.caseID = this.riskAssessmentData.CaseId;

        if (this.riskAssessmentData.RiskStatement) {

          if (this.riskAssessmentData.RiskStatement.length > 0) {
            this.CaseStatus = this.riskAssessmentData.RiskStatement[0].Status;
          }

          this.items = this.riskAssessmentData.RiskStatement;
        }

      } else {
        this.viewTitle = "New";
      }
    }
    this.riskStatement.Status = "New"
    this.toggleCollection = [{ Value: true, DisplayText: "Yes" }, { Value: false, DisplayText: "No" }];

    if (this.viewTitle == 'Approval' || this.viewTitle == 'Scope') {
      this.allFieldsReadOnly = true;
    }

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
        this.notesService.savenote(this.riskAssessmentData.RegistrationParticulars.CustomsCode, result.value)
          .subscribe(res => {
            this.isPostActionCompleted = false;
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {
              swal(
                'Record',
                'Note Saved Successfully',
                'success'
              );
              this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
      }
    });
  }

  onRiskAssessment() {
    this._riskAssessmentService.getRiskArea()
      .subscribe(riskArealist => {
        this.riskArealist = riskArealist;
      },
        error => this.errorMessage = <any>error);

  }

  calculateOverallRiskRating() {
    let total = 0;
    if (this.riskStatement.RiskRatingLikelihoodId && this.riskStatement.RiskRatingConcernedId) {

      var ratingLikelyHoodObject = this.riskRatingsLikelihoodList.filter(item => item.RiskRatingLikelihoodId === this.riskStatement.RiskRatingLikelihoodId);
      var ratingRatingConcernedObject = this.riskRatingsConcernedList.filter(item => item.RiskRatingConcernedId === this.riskStatement.RiskRatingConcernedId);

      if (ratingLikelyHoodObject && ratingRatingConcernedObject && ratingLikelyHoodObject.length > 0 && ratingRatingConcernedObject.length > 0) {
        total = Number(ratingLikelyHoodObject[0].Ratings) * Number(ratingRatingConcernedObject[0].Ratings);
      }
    }
    this.riskStatement.OveralRiskRating = total.toString();
  }

  onEdit(rskStatement) {
    if (this.items != null) {
      this.items.forEach((item, index) => {
        if (this.IsSameRiskstatement(item)) {
          this.items[index] = rskStatement
        }
      })

      this.riskStatementBeforeEdit = new RiskStatementClass();
      this.currentIndex = -1;
      this.riskStatement = new RiskStatementClass();
    }
    this.riskStatementDisplayDialog = false;

  }

  addRefDetails(rskStatement) {
    if (!this.riskAssessmentData.RiskStatement) {
      this.riskAssessmentData.RiskStatement = [];
    }

    rskStatement.DateCreated = new Date().toLocaleDateString();
    rskStatement.Status = 'New';
    rskStatement.RiskStatementId = '';
    rskStatement.IsRemoved = false;
    if (this.items != null && this.items.length > 0) {
      rskStatement.RiskAssessmentId = this.items[0].RiskAssessmentId;
    }

    this.riskAssessmentData.RiskStatement.push(rskStatement);
    this.items = this.riskAssessmentData.RiskStatement;

    this.riskStatement = new RiskStatementClass();
    this.riskStatementDisplayDialog = false;
  }


  onViewCustomerTurnOver(customerTurnOver: CustomsTurnOverDetailsClass, index: any) {
    this.customsTurnOverDetailsClass = customerTurnOver;
    this.customersTurnoverDisplayDialog = true;
  }

  onViewCustomerRegParticulars(customerParticulars: CustomsRASParticularsClass, index: any) {
    this.customsParticularsClass = customerParticulars;
    this.customersRegDisplayDialog = true;
  }
  onViewDirectorDetails(directorDetails: DirectorDetailsClass, index: number) {
    this.directorDetailsDisplayDialog = true;
    this.directorDetailsClass = directorDetails;
  }

  onRiskRatingsLikelihood() {
    this._riskAssessmentService.getRiskRatingsLikelihood()
      .subscribe(riskRatingsLikelihoodList => {
        this.riskRatingsLikelihoodList = riskRatingsLikelihoodList;
      },
        error => this.errorMessage = <any>error);

  }


  onRiskRatingsConcerned() {
    this._riskAssessmentService.getRiskRatingsConcerned()
      .subscribe(riskRatingsConcernedList => {
        this.riskRatingsConcernedList = riskRatingsConcernedList;
      },
        error => this.errorMessage = <any>error);
  }

  onHSChapterApplied() {
    this._riskAssessmentService.getIndustry()
      .subscribe(industryList => {
        this.industryList = industryList;
      },
        error => this.errorMessage = <any>error);
  }

  onIndustry() {
    this._riskAssessmentService.getHSChapterApplied()
      .subscribe(hSChapterAppliedList => {
        this.HSChapterAppliedList = hSChapterAppliedList;
      },
        error => this.errorMessage = <any>error);
  }


  onCancel() {
    // clear fields
    this.data.riskAssessmentStorage = null;
    this._router.navigate(['/dashboard']);

  }

  onRefDetailsRemove(dt, gridItem) {
    if (this.riskAssessmentData.RiskStatement != null) {
      var temp = this.riskAssessmentData.RiskStatement.filter(x => x.IsRemoved == false).length;
      if (temp == 1) {
        swal('Cannot Delete', 'There must be at least one Risk Statement', 'error');
      }
      else {
        gridItem.IsRemoved = true;
        dt.filter('false', 'IsRemoved', 'equals');
      }
    }

  }

  PopulateNewRiskAssessment(oldriskAssment: RiskStatementClass) {
    return JSON.parse(JSON.stringify(oldriskAssment));
  }


  IsSameRiskstatement(oldriskAssment) {

    if (this.riskStatementBeforeEdit.RiskStatementId == oldriskAssment.RiskStatementId &&
      this.riskStatementBeforeEdit.IBRCustumsNbr == oldriskAssment.IBRCustumsNbr &&
      this.riskStatementBeforeEdit.NumberOfRiskPerRiskArea == oldriskAssment.NumberOfRiskPerRiskArea &&
      this.riskStatementBeforeEdit.RiskAreaId == oldriskAssment.RiskAreaId &&
      this.riskStatementBeforeEdit.Recommendations == oldriskAssment.Recommendations &&
      this.riskStatementBeforeEdit.RiskRatingLikelihoodId == oldriskAssment.RiskRatingLikelihoodId &&
      this.riskStatementBeforeEdit.RiskRatingConcernedId == oldriskAssment.RiskRatingConcernedId &&
      this.riskStatementBeforeEdit.OveralRiskRating == oldriskAssment.OveralRiskRating &&
      this.riskStatementBeforeEdit.HSChapterAppliedToId == oldriskAssment.HSChapterAppliedToId &&
      this.riskStatementBeforeEdit.EstimatedRevenueAtRisk == oldriskAssment.EstimatedRevenueAtRisk &&
      this.riskStatementBeforeEdit.RiskDescription == oldriskAssment.RiskDescription &&
      this.riskStatementBeforeEdit.IndustryId == oldriskAssment.IndustryId &&
      this.riskStatementBeforeEdit.DateCreated == oldriskAssment.DateCreated &&
      this.riskStatementBeforeEdit.RiskAssessmentId == oldriskAssment.RiskAssessmentId &&
      this.riskStatementBeforeEdit.StatusId == oldriskAssment.StatusId &&
      this.riskStatementBeforeEdit.AuditRiskArea == oldriskAssment.AuditRiskArea &&
      this.riskStatementBeforeEdit.IsIntegratedAuditRequired == oldriskAssment.IsIntegratedAuditRequired &&
      this.riskStatementBeforeEdit.IsRelateToSarsComplianceOrCustomsFocusArea == oldriskAssment.IsRelateToSarsComplianceOrCustomsFocusArea &&
      this.riskStatementBeforeEdit.AuditFindings == oldriskAssment.AuditFindings &&
      this.riskStatementBeforeEdit.Status == oldriskAssment.Status &&
      this.riskStatementBeforeEdit.IsRemoved == oldriskAssment.IsRemoved)
      return true;

    return false;
  }


  onRefDetailsEdit(SarsRefDetail, index) {
    this.riskStatementBeforeEdit = this.PopulateNewRiskAssessment(SarsRefDetail);
    this.riskStatement = this.PopulateNewRiskAssessment(SarsRefDetail);

    this.CurrentEditIndex = index;
    this.riskStatementDisplayDialog = true;
  }


  onBack() {
    if (this.urlrole) {
      var actionLink = '/' + this.urlrole;
      this._router.navigate([actionLink]);

      // if (this.fromView == "Audit Plan") {
      //   //createauditplan
      //   //  this._router.navigate(["/createauditplan"]);
      //   this._router.navigate(["/createauditplan", { view: "vddlview", role: "donotinitagian" }]);

      // }
    }

  }

  entityDetailsEdit(entityDetail, entityDetails, i) {
    this.EntityIndex = i;
    this.riskAssessmentData = entityDetail;

  }

  onSave() {

    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;
    this.riskkAssessmentCombinedData.IsEdit = true;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }
    this.isPostActionCompleted = true;
    this._riskAssessmentService.addriskAssment(this.riskkAssessmentCombinedData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment Saved Successfully',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to save - ' + res,
            'error'
          )
        }
      },
        error => this.errorMessage = <any>error);

  }

  onsubmit() {

    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }

    if (this.riskAssessmentData.RiskStatement == null && this.riskAssessmentData.RiskStatement.length == 0) {
      swal({ type: 'error', title: 'ERROR', text: 'Atleast One Risk Statement Must Be Captured', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })
      return;
    }

    this.isPostActionCompleted = true;
    this._riskAssessmentService.submitriskAssment(this.riskkAssessmentCombinedData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment Submitted Successfully',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to submit - ' + res,
            'error'
          )
        }

      },
        error => this.errorMessage = <any>error);
  }

  onreworksubmit() {
    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }
    this.isPostActionCompleted = true;
    this._riskAssessmentService.reworksubmitriskAssment(this.riskkAssessmentCombinedData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment Submitted Successfully',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to submit - ' + res,
            'error'
          )
        }

      },
        error => this.errorMessage = <any>error);
  }

  onGetOriginCase() {
    this._riskAssessmentService.getOriginoCase()
      .subscribe(originCaseList => {
        this.originCaseList = originCaseList;
      },
        error => this.errorMessage = <any>error);

  }

  onAccept() {
    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }

    this.isPostActionCompleted = true;
    this._riskAssessmentService.approveAssment(this.riskkAssessmentCombinedData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment Approved Successfully',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to approve - ' + res,
            'error'
          )
        }
      },
        error => this.errorMessage = <any>error);
  }

  onrework() {
    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }
    this.isPostActionCompleted = true;
    this._riskAssessmentService.reworkAssment(this.riskkAssessmentCombinedData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment submitted for rework',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to submit for rework - ' + res,
            'error'
          )
        }
      },
        error => this.errorMessage = <any>error);
  }


  onQaAllocation() {

    var supsCase = new SarClass();
    supsCase.CaseId = this.caseID;

    this.sardata.sarStorage = supsCase;
    this.sardata.sarStorage.Stage = "AllocateToQa";
    this._router.navigate(["/allocatesar", { actionType: "AllocateToQa" }]);
  }

  onTechnicalReviewAction(type) {

    this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

    if (this.caseID) {
      this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
    }
    this.isPostActionCompleted = true;
    this._riskAssessmentService.technicalReviewAction(this.riskkAssessmentCombinedData, type)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'Risk Assessment submitted successfully',
            'success'
          )

          this.riskAssessmentData = new RiskAssessmentClass();
          this.uploadedDocs.documentUploadStroage = null;
          this.onCancel();
        }

        else {
          swal(
            'Record',
            'Failed to submit',
            'error'
          )
        }
      },
        error => this.errorMessage = <any>error);
  }


  // onReject(raDetails) {
  //   this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
  //   this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

  //   if (this.caseID) {
  //     this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
  //   }
  //   this._riskAssessmentService.rejectAssment(this.riskkAssessmentCombinedData)
  //     .subscribe(res => {
  //       this.repData = res;
  //       if (this.repData == "1") {
  //         swal(
  //           'Record',
  //           'Case/RA Rejected successfully',
  //           'success'
  //         )

  //         this.riskAssessmentData = new RiskAssessmentClass();
  //         this.uploadedDocs.documentUploadStroage = null;
  //         this.onCancel();
  //       }

  //       else {
  //         swal(
  //           'Record',
  //           'Failed to reject - ' + res,
  //           'error'
  //         )
  //       }
  //     },
  //       error => this.errorMessage = <any>error);
  // }

  onReject(raDetails) {
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
        this.notesService.savenote(this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId, result.value)
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
                  this.riskkAssessmentCombinedData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
                  this.riskkAssessmentCombinedData.RiskAssessmentReportResult = this.riskAssessmentData;

                  if (this.caseID) {
                    this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId = this.caseID;
                  }
                  this.isPostActionCompleted = true;
                  this._riskAssessmentService.rejectAssment(this.riskkAssessmentCombinedData)
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.repData = res;
                      if (this.repData == "1") {
                        swal(
                          'Record',
                          'Case/RA Rejected successfully',
                          'success'
                        )

                        this.riskAssessmentData = new RiskAssessmentClass();
                        this.uploadedDocs.documentUploadStroage = null;
                        this.onCancel();
                      }

                      else {
                        swal(
                          'Record',
                          'Failed to reject - ' + res,
                          'error'
                        )
                      }
                    },
                      error => this.errorMessage = <any>error);
                }

              })

              this.commentsCaseId = this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.riskkAssessmentCombinedData.RiskAssessmentReportResult.CaseId;

      }
    })

  }

  getRAFormByIBRnumber() {
    this._riskAssessmentService.getRAbyIBRNumber(this.IBRnumber)
      .subscribe(res => {
        if (res != null && res.RiskAssessmentReportResult != null) {
          this.riskkAssessmentCombinedData = res;
          this.riskAssessmentData = res.RiskAssessmentReportResult;
          this.uploadedDocs.documentUploadStroage = res.UploadedFiles;
          this.commentsCaseId = res.RiskAssessmentReportResult.CaseId;

          if (this.riskAssessmentData.RiskStatement) {
            this.items = this.riskAssessmentData.RiskStatement;

            if (this.riskAssessmentData.RiskStatement.length > 0) {
              this.CaseStatus = this.riskAssessmentData.RiskStatement[0].Status;
            }

          }

        } else {
          // swal("No details found for IBR Number provided", "", "info");
          swal({ type: 'info', title: 'Record', text: "No details found for IBR Number provided", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })


        }
      },
        error => this.errorMessage = <any>error);

  }

  getRAFormByCaseId() {
    this._riskAssessmentService.getRAFormByCaseId(this.caseIdFromView)
      .subscribe(res => {
        if (res != null && res.RiskAssessmentReportResult != null) {
          this.riskkAssessmentCombinedData = res;
          this.riskAssessmentData = res.RiskAssessmentReportResult;
          this.uploadedDocs.documentUploadStroage = res.UploadedFiles;
          this.commentsCaseId = res.RiskAssessmentReportResult.CaseId;

          if (this.riskAssessmentData.RiskStatement) {
            this.items = this.riskAssessmentData.RiskStatement;

            if (this.riskAssessmentData.RiskStatement.length > 0) {
              this.CaseStatus = this.riskAssessmentData.RiskStatement[0].Status;
            }
          }

        } else {
          swal("No details found for Case Number provided", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }




  effectCaseProcess(stage) {
    switch (stage) {
      case 'getTechnicalReviewForms':
        {
          this.IstechReview = true;
          this.technicalReviewButton = "Submit Technical Review";
          this.viewTitle = "Technical Review";
          break;
        }

      case 'getApprovedTechnicalReviewForms':
        {
          this.IstechReview = true;
          this.technicalReviewButton = "Submit Technical Review"
          this.viewTitle = "Technical Review";
          break;
        }

      case 'getApprovedTechnicalReviewQAList':
        {
          this.IstechReview = true;
          this.technicalReviewButton = "Submit Technical Review";
          this.viewTitle = "Technical Review";
          break;
        }

      case 'getRejectedTechnicalReviewForms':
        {
          this.IstechReview = true;
          this.technicalReviewButton = "Submit Technical Review"
          this.viewTitle = "Technical Review";
          break;

        }
      default: this.viewTitle = stage;
    }
  }


  showRiskSatement() {
    this.riskStatement = new RiskStatementClass();
    this.riskStatementDisplayDialog = true;
  }

  closeWindow() {

    this.directorDetailsDisplayDialog = false;
  }

  closeWindowCustomersTurnover() {
    this.customersTurnoverDisplayDialog = false;
  }

  closeCustRegWindow() {
    this.customersRegDisplayDialog = false;
  }

}
