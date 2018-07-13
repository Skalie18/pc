import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditorTemplateService } from './auditor-template.service';
import { LookUpService } from 'app/lookUp/lookup.service';
import { IAuditRequiredLKP, ITypeOfAuditLKP, IVddlLKP } from 'app/lookUp/lookup-interfaces';

import swal from 'sweetalert2';
import { AuditorClass, AuditPlanResult } from './auditor-class';
import { IAuditcheckListInterface } from './auditcheck-list-interface';
import { LookupAddress } from 'dns';
import { isError } from 'util';
import { AuditDataproviderService } from './audit-dataprovider-service.service';
import { DocumentUploadProviderService } from '../providers/document-upload-provider.service';
import { DocumentViewerComponent } from 'app/shared-modules/document-view/document-viewer/document-viewer.component';

import { Observable } from 'rxjs/Observable';
import { DocumentClass } from '../shared-modules/document-upload/document-class';
import { DocumentViewerService } from '../shared-services/document-viewer-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { vddlDataProvider } from '../client-interface/provider/data-provider';
import { CommentsViewDataService } from '../shared-modules/comments-view/comments-view-data.service';
import { CommentsViewComponent } from 'app/shared-modules/comments-view/comments-view/comments-view.component';
import { DataProvider } from '../crcs-specialist/provider/data-provider';
import { PendCaseDataService } from '../shared-services/pend-case/pend-case-data.service';

import { ViewchangedatastoreService } from '../providers/viewchangedatastore.service';
import { NgForm } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { DataTable } from 'primeng/components/datatable/datatable';


@Component({
  selector: 'app-auditplan',
  templateUrl: './auditplan.component.html',
  styleUrls: ['./auditplan.component.scss']
})

export class AuditplanComponent implements OnInit {
  caseID: any;
  auditlistItems: Array<any>[];
  errorMessage: String;
  audiDetails: AuditorClass = new AuditorClass();
  toggleCollection = [];
  resultData: any;
  vDLookup: Array<IVddlLKP>[];
  auditRequiredLookup = [];
  typeOfAuditLook: Array<ITypeOfAuditLKP>[];
  documentLetter: any;
  documentItems: Array<any> = new Array();
  commentsCaseId: String = '';
  repData: any;
  auditCaseType: any;
  backView: String;
  d: Date = new Date();
  // datePickerDate: Date;
  currentUser: String;
  selectedAuditRequired: any[];
  urlAction = '';
  isPostActionCompleted = false;
  isLoaded = true;

  @ViewChild('auditCheckList') myForm;
  constructor(private auditServices: AuditorTemplateService, private lookUpService: LookUpService,
    private storageDataAuditService: AuditDataproviderService, private dvservice: DocumentViewerService,
    private router: Router, private systemUser: SystemUserProviderService, private data: vddlDataProvider,
    private notesService: CommentsViewDataService, private riskAssessmentData: DataProvider,
    private documentsAndLetters: DocumentUploadProviderService, private pendCaseService: PendCaseDataService,
    private _router: ActivatedRoute, private storeData: ViewchangedatastoreService) {
    this.currentUser = systemUser.systemUserStorage.SID;

    if (_router.snapshot.url.length > 0) {
      this.urlAction = _router.snapshot.url[0].path;
    }
  }

  ngOnInit() {
    this.backView = this._router.snapshot.params['role'];


    this.getLookUpData();
    this.toggleCollection = [{ Value: true, DisplayText: 'Yes' }, { Value: false, DisplayText: 'No' }];

    const _opendAuditPlan = this.storageDataAuditService.auditDataPlanStorage;
    const _auditDataStorage = this.storageDataAuditService.auditDataStorage;
    const _auditDataRAStorage = this.storageDataAuditService.AuditDataRiskAssessment;

    this.auditCaseType = this.storageDataAuditService.auditCaseType;

    if (_auditDataStorage && this.auditCaseType === 'Voluntary Disclosure/Demand Led') {
      this.caseID = _auditDataStorage.VddlDetails.CaseId;
      this.commentsCaseId = _auditDataStorage.VddlDetails.CaseId;
    }

    if (_auditDataRAStorage && this.auditCaseType === 'Risk Assessment Report') {
      this.caseID = _auditDataRAStorage.RiskAssessmentReportResult.CaseId;
      this.commentsCaseId = _auditDataRAStorage.RiskAssessmentReportResult.CaseId;
    }

    if (_opendAuditPlan) {
      this.documentItems = _opendAuditPlan.AuditDocuments; // documents
      this.audiDetails = _opendAuditPlan.AuditTemplate; // the actual template
      this.auditlistItems = _opendAuditPlan.CheckList; // these are checklist items.
      this.caseID = _opendAuditPlan.CaseId;
      this.commentsCaseId = _opendAuditPlan.CaseId;
      this.auditCaseType = _opendAuditPlan.CaseType;
    }
    // fix dates
    if (this.audiDetails.StartDate !== null && this.audiDetails.StartDate.toString() !== '0001-01-01T00:00:00') {
      this.audiDetails.StartDate = new Date(this.audiDetails.StartDate);
    } else {
      this.audiDetails.StartDate = undefined;
    }
    if (this.audiDetails.EndDate !== null && this.audiDetails.EndDate.toString() !== '0001-01-01T00:00:00') {
      this.audiDetails.EndDate = new Date(this.audiDetails.EndDate);
    } else {
      this.audiDetails.EndDate = undefined;
    };


    if (!this.auditlistItems) {
      this.getcompleteAuditPlanQuestions();
    }


    if (this.backView !== undefined &&  this.backView.toString() === 'donotinitagian') {
      this.audiDetails = this.storeData.datastore;
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
            this.auditRequiredLookup.push({ label: element.Description, value: { AuditRequiredId: element.AuditRequiredId  } });

          });
           const self = this;
           let auditArray = [];
           if (self.audiDetails.AuditRequiredId != null) {
           auditArray = self.audiDetails.AuditRequiredId.split(',');
           }

          this.selectedAuditRequired = this.auditRequiredLookup.filter(function(elementx) {
            let found = false;
            if (self.audiDetails.AuditRequiredId != null) {
              if (auditArray.length > 0) {
                self.selectedAuditRequired = [];
                auditArray.forEach((elementt, index) => {
                  if (elementt === elementx.value.AuditRequiredId) {
                    found = true;
                  }
                });
              }
            }
            return found;
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

  }


  getcompleteAuditPlanQuestions() {

    this.auditServices.getcompleteAuditPlanQuestions()
      .subscribe(res => {
        if (res != null) {
          this.auditlistItems = res;
        } else {
          swal('No Records Found!', '', 'info');
        }
      },
        error => this.errorMessage = <any>error);
  }

  generateRequestForrelavantMaterial() {
    const audtDocLetter = new DocumentClass();
    audtDocLetter.CaseId = this.caseID;
    audtDocLetter.UploadedBy = this.systemUser.systemUserStorage.SID;
    audtDocLetter.DocumentType = 'PCA_CI_Request_for_Relevant_Material_Letter';
    this.isPostActionCompleted = true;
    this.auditServices.getDocumentGenerationLetter(audtDocLetter)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        if (res != null) {
          if (res.Success === 1) {
            if (!this.documentItems) {
              this.documentItems = [];
            }
            this.documentItems.push(res.Document);
          } else {
            swal(res.Message, '', 'error');
          }
        }
      },
        error => {
          this.errorMessage = <any>error;
          this.handleError(error);
        }
      );
  }

  getDocumentGenerationLetter() {
    const audtDocLetter = new DocumentClass();
    audtDocLetter.CaseId = this.caseID;
    audtDocLetter.UploadedBy = this.systemUser.systemUserStorage.SID;
    audtDocLetter.DocumentType = 'PCA_CI_Notification_of_Audit_Letter';
    audtDocLetter.DocumentContent = JSON.stringify(this.audiDetails);
    this.isPostActionCompleted = true;
    this.auditServices.getDocumentGenerationLetter(audtDocLetter)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        if (res != null) {
          if (res.Success === 1) {
            if (!this.documentItems) {
              this.documentItems = [];
            }
            this.documentItems.push(res.Document);
          } else {
            swal(res.Message, '', 'error');
          }
        }
      },
        error => {
          this.errorMessage = <any>error;
          this.handleError(error);
        }
      );
  }

  saveCompletedAuditPlan() {
    this.isPostActionCompleted = true;
    this.auditServices.saveAuditPlan(this.audiDetails)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData === '1') {
          swal(
            'AuditPlan',
            'Audit Saved Successfully',
            'success'
          );
          this.onCancel();
        } else {
          swal(
            'AuditPlan',
            'Audit Did Not Save',
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

  onCancel() {
    this.storageDataAuditService.auditDataPlanStorage = null;
    this.router.navigate(['/dashboard']);
  }

  saveCompleteAuditPlanAllInOne() {
    this.isPostActionCompleted = true;
    this.auditServices.saveCompleteAuditPlanAllInOne(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData === '1') {
          swal(
            'AuditPlan',
            'Audit Saved Successfully',
            'success'
          );
          this.onCancel();
        } else {
          swal(
            'AuditPlan',
            'Audit Did Not Save',
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

  submitAuditPlan() {
    this.isPostActionCompleted = true;
    this.auditServices.submitAuditPlan(this.getAuditPlanResult())
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.resultData = res;
        if (this.resultData === '1') {
          swal(
            'AuditPlan',
            'Audit Plan Successfully Submitted for Approval',
            'success'
          );
          this.onCancel();
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

  getAuditPlanResult() {
    const auditPlanResult = new AuditPlanResult();
    auditPlanResult.AuditDocuments = this.documentItems;
    auditPlanResult.AuditTemplate = this.audiDetails;
    auditPlanResult.CaseId = this.caseID;
    auditPlanResult.IsEdit = this.storageDataAuditService.auditDataPlanStorage == null ? false : true;
    auditPlanResult.CheckList = this.auditlistItems;
    const auditArray = [];
    if (this.selectedAuditRequired != null && this.selectedAuditRequired.length > 0) {
      this.selectedAuditRequired.forEach(element => {
        auditArray.push(element.AuditRequiredId);
      });
      auditPlanResult.AuditTemplate.AuditRequiredId = auditArray.join(',');
    }
    return auditPlanResult;
  }

  //#endregion

  //#region Events Helpers

  onToggleChange(sender, type) {
    const chosenValue = sender.target.value;
    if (chosenValue) {
      const value = chosenValue.split(':');
      if (value.length > 1) {
        switch (type) {
          case 'IsTraderPreviouslyAudited':
            {
              if (value[1].trim() === 'true') {
                swal('', 'Request what action if any should be taken with respect to the audit activity', 'info');
              }
            }
            break;
          case 'IsExistingAuditOrInvestigation':
            {
              if (value[1].trim() === 'true') {
                swal('', 'Check for potential non-compliance  then proceed', 'info');
              }
            }
            break;
          case 'IsThereAnExistingAudit':
            {
              if (value[1].trim() === 'true') {
                swal('', 'Check for potential non-compliance', 'info');
              }
            }
            break;
        }

      }
    }
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
    const file = event.target.files;

    for (let index = 0; index < file.length; index++) {
      const fName = file[index].name;
      const fSize = file[index].size;
      const doc = new DocumentClass;
      this.loadDoc(event, file[index]).subscribe((f) => {
        doc.DocumentContent = f;
        doc.FileName = fName;
        doc.FileSize = fSize;
        doc.IsRemoved = false;
      });
      this.documentItems.push(doc);
      event.target.value = '';

    }
  }

  removeDocument(documentItem, dt: DataTable) {

    documentItem.IsRemoved = true;
    dt.filter('false', 'IsRemoved', 'equals');

    // this.documentItems[index].IsRemoved = true;
    // Dont splice as the Isremoved will take the item off the screen and then get saved back to the db
    // this.documentItems.splice(index, 1);
  }

  viewDocument(documentItem) {
    const document = documentItem;
    const documentContent = document.DocumentContent;

    if (documentContent.toString() !== '' && documentContent !== undefined) {
      const result = this.dvservice.getpdfdocument(documentContent.toString());
      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For Internet explorer
        window.navigator.msSaveOrOpenBlob(result, document.FileName);
      } else {
        const url = window.URL.createObjectURL(result);
        window.open(url);
      }
    } else {
      // alert('Document Did not load Properly');
    }
  }

  viewVddl(vddlQuestionId) {
    if (this.auditCaseType === 'Voluntary Disclosure/Demand Led') {
      this.router.navigate(['/viewvddl', { view: 'auditPlan', data: this.caseID, value: vddlQuestionId }]);
      this.storeData.datastore = this.audiDetails;
    } else if (this.auditCaseType === 'Risk Assessment Report') {
      this.router.navigate(['/createcrcs', { view: 'Audit Plan', data: this.caseID, role: this.urlAction }]);
      this.storeData.datastore = this.audiDetails;
      // var raDetails = this.storageDataAuditService.AuditDataRiskAssessment;
      // raDetails.Stage = "Audit Plan";
      // this.riskAssessmentData.riskAssessmentStorage = raDetails;
      // this.router.navigate(['/createcrcs']);
    }
  }
  //#endregion
  onPend(caseid) {
    const dateFormat = require('dateformat');
    let today = new Date;
    today.setDate(today.getDate() + 1);

    today = dateFormat(today, 'yyyy-mm-dd');
    swal({
      title: 'Pend Case',
      html: 'Select date to pend case: <input type="date" id="datepicker" value="' + today + '" min="' + today + '"  >',
      //        onOpen: function() {$('#datepicker').datepicker();},
      type: 'question'
    }).then((result) => {
      if (result.value) {
        const selectedDate = new Date((document.getElementById('datepicker') as HTMLInputElement).value);
        //         var selectedDate =new Date($('#datepicker').val());
        const day = selectedDate.getDay();
        if (day === 0 || day === 6) {
          swal('Pend Result', 'Pend Case failed: <br>Weekend Not Allowed', 'error');
        } else {
          this.pendCaseService.onPendCase(caseid, selectedDate)
            .then(
              this.router.navigate(['/dashboard']))
            .catch(
              swal('Failed to pend case', 'Case did not pend, please try again later', 'error')
            );
        }
      }
    }
    );
  }


  onUnPend(caseid) {
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
          this.pendCaseService.onUnPendCase(caseid)
            .then(
              // this.router.navigate(['/vddlpended', {pended:"true"}])
            ).catch(
              swal('Failed to unpend case', 'Case did not unpend, please try again later', 'error')
            );
        }
      });
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
    const m = JSON.stringify(message);
    const _body = JSON.parse(m)._body;
    const exceptionmessage = JSON.parse(_body).ExceptionMessage;
    if (exceptionmessage !== undefined && exceptionmessage !== null) {
      swal('Document Generation Error ', exceptionmessage, 'error');
    }
  }



}
