import { Component, OnInit } from '@angular/core';
import { UserClass } from './user-class';
import { Iuser } from './user-interface';
import { SarProvider } from 'app/user/sar-provider';
import { UserService } from 'app/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RefDetailsClass } from './ref-details-class';
import { EntityDetailsClass } from './entity-details-class';
import { ResidentailBusinessAddressClass } from 'app/user/residentail-business-address-class';
import { NoncomplianceDetailsClass } from 'app/user/noncompliance-details-class';
import { ReportedPersonClass } from 'app/user/reported-person-class';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';
import { UpdateDatagridService } from '../shared-services/update-datagrid.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { PagerService } from '../shared-services/pager.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";
import { DocumentUploadProviderService } from '../providers/document-upload-provider.service';
import { ISarInterface } from './sar-interface';
import { SarClass } from './sar-class';
import { ReportingPersonClass } from './reporting-person-class';
import { IncometaxValidationService } from '../shared-services/validations/incometax-validation.service';
import { VatValidationService } from '../shared-services/validations/vat-validation.service';
import { LookupAddress } from 'dns';
import { LookUpService } from '../lookUp/lookup.service';
import { PendCaseDataService } from '../shared-services/pend-case/pend-case-data.service';
import { CommentViewProviderService } from '../shared-modules/comments-view/comments-view-provider.service';
import { NgModel } from '@angular/forms';
import { LKPCountryCodes, LKPProvince } from '../lookUp/lookup-interfaces';


@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss']
})
export class ActivityreportComponent implements OnInit {

  sar: ISarInterface;
  // sarData: UserClass = new UserClass();
  // if (this.sarData.SuspiciousActivityReportDetails.SarsRefDetails.length == 0) {
  sarData: SarClass = new SarClass();

  displayDialog: boolean;
  entityDisplayDialog: boolean;
  reportedPersonDisplayDialog: boolean;
  residentialBusinessDisplayDialog: boolean;
  noncomplianceDetailsDisplayDialog: boolean;

  errorMessage: string;
  refDetailsData: RefDetailsClass = new RefDetailsClass();
  entityDetailsData: EntityDetailsClass = new EntityDetailsClass();
  reportedPersonData: ReportedPersonClass = new ReportedPersonClass();
  residentialBusinessData: ResidentailBusinessAddressClass = new ResidentailBusinessAddressClass();
  nonComplianceData: NoncomplianceDetailsClass = new NoncomplianceDetailsClass();

  disableAddButton: boolean = false;

  travellerList: Array<any> = new Array();
  companiesList: Array<any>;
  provincesList: Array<any>;
  timeFrameList: Array<any>;
  yearlyLossList: Array<any>;
  viewTitle: String;
  regionItems: Array<any>;

  items: Array<any> = new Array();
  // no Compliance vars
  nonComItems: Array<any> = new Array();;
  // residentail bus Address vars
  resItems: Array<any> = new Array();;
  // reported person vars
  repItems: Array<any> = new Array();;
  // entity type vars
  entItems: Array<any> = new Array();;


  // index for the object from the datagrid
  SarRefIndex: number;
  NonComIndex: number;
  ResBusIndex: number;
  RepPersonIndex: number;
  EntityIndex: number;

  repType: any;
  userRole: String;
  commentsCaseId: String = '';
  repData: any;


  numberToRepeat: number;
  numberToRepeatComp: number;
  customsExciseLists: any;
  d: Date = new Date();
  buttonsToShow: String;
  fromView: String;
  qaReviewLink: string;

  isExcise: String;
  CompanyTraderImporterExporter: String;
  TravellerIndividual: String;
  Pending: Boolean = false;

  sarRefList: any;
  disableRefButton: boolean;
  disableEntButton: boolean;
  disableRepBusButton: boolean;
  disableRepButton: boolean;
  disableNonComButton: boolean;


  disableRefSaveButton: boolean;
  disableEntSaveButton: boolean;
  disableRepBusSaveButton: boolean;
  disableRepSaveButton: boolean;
  disableNonComSaveButton: boolean;
  allFieldsReadOnly: boolean = false;
  isPostActionCompleted: boolean = false;
  isLoaded: boolean = true;
  resultsCountryCodes: LKPCountryCodes[];
  countryCodes: LKPCountryCodes[];
  provinces: LKPProvince[];
  futureDate = new Date();
  urlPath: String;

  alphawithspace: RegExp = /^[a-zA-Z ]*$/;

  constructor(private data: SarProvider, private notesService: CommentsViewDataService, private uploadedDocs: DocumentUploadProviderService, private _sarService: UserService, private _router: Router, private pagerService: PagerService, private updateData: UpdateDatagridService,
    private systemUser: SystemUserProviderService, private incomeValService: IncometaxValidationService, private vatValService: VatValidationService, private lookservice: LookUpService, private router: ActivatedRoute, private pendCaseService: PendCaseDataService, private notesProvider: CommentViewProviderService) {

    this.getGetClientType();
    // this.onCompanies();
    // this.onProvinces();
    this.onTimeFrame();
    this.onYearlyLoss();
    this.getRegion();
    this.getCustomsExcise();
    this.getCountryCodes();
    this.getProvinces();
    this.userRole = this.systemUser.systemUserStorage.Role;
    this.buttonsToShow = router.snapshot.params["role"];

    if (router.snapshot.url.length > 0) {
      this.urlPath = router.snapshot.url[0].path;
    }



  }
  ngOnInit() {
    this.getGetClientType();
    this.userRole = this.systemUser.systemUserStorage.Role;

    if (this.data.sarStorage && this.urlPath !== 'createsar') {
      this.viewTitle = "Suspicious Activity Report Edit";
      this.sarData = this.data.sarStorage;
      if (this.sarData.SuspiciousActivityReportDetails.PersonReportingDetails == null) {
        this.sarData.SuspiciousActivityReportDetails.PersonReportingDetails = new ReportingPersonClass()
      }
      if (this.userRole == "CRCS Reviewer") {
        this.commentsCaseId = this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId;
      }

      if (this.data.sarStorage.Stage == 'Pending Analysis Cases') {
        this.Pending = true;
      }

      if (this.data.sarStorage.Stage == 'Indepth Analysis Cases') {
        this.allFieldsReadOnly = true;
      }

      this.uploadedDocs.documentUploadStroage = this.sarData.UploadedFiles
      this.notesProvider.commentViewStorage = this.sarData.CaseNotes;

      // inti for each datagrid items 
      this.onInitOfSarsRefDetails();
      this.onInitOfEntityTypeDetails();
      this.onInitOfReportedPersonDetails();
      this.onInitOfResidentialBusinessAddress();
      this.onInitOfNonComplianceDetails();



    } else {

      this.viewTitle = "Suspicious Activity Report ";
      this.sarData;

      // this.onCompanies();
      this.onProvinces();
      this.onTimeFrame();
      this.onYearlyLoss();

      // checking if there are document 
      if (this.uploadedDocs.documentUploadStroage) {
        this.uploadedDocs.documentUploadStroage = null;
      }

      if (this.sarData) {
        this.sarData = new SarClass();
      }

    }

  }



  onCancel() {
    // clear fields
    this.data.sarStorage = null;
    this._router.navigate(['/dashboard']);

  }

  onInitOfSarsRefDetails() {
    if (this.data.sarStorage.SuspiciousActivityReportDetails.SarsRefDetails != null) {
      this.sarRefList = this.data.sarStorage.SuspiciousActivityReportDetails.SarsRefDetails
      this.items = this.data.sarStorage.SuspiciousActivityReportDetails.SarsRefDetails.filter(items => items.IsRemoved != true);
    }
  }

  onInitOfEntityTypeDetails() {
    if (this.data.sarStorage.SuspiciousActivityReportDetails.EntityTypeDetails != null) {
      this.entItems = this.data.sarStorage.SuspiciousActivityReportDetails.EntityTypeDetails.filter(items => items.IsRemoved != true);
    }
  }

  onInitOfReportedPersonDetails() {

    if (this.data.sarStorage.SuspiciousActivityReportDetails.ReportedPersonDetails != null) {
      this.repItems = this.data.sarStorage.SuspiciousActivityReportDetails.ReportedPersonDetails.filter(items => items.IsRemoved != true);

    }
  }

  onInitOfResidentialBusinessAddress() {

    if (this.data.sarStorage.SuspiciousActivityReportDetails.ResidentialBusinessAddress != null) {
      this.resItems = this.data.sarStorage.SuspiciousActivityReportDetails.ResidentialBusinessAddress.filter(items => items.IsRemoved != true);;
    }

  }

  onInitOfNonComplianceDetails() {

    if (this.data.sarStorage.SuspiciousActivityReportDetails.NonComplianceDetails != null) {
      this.nonComItems = this.data.sarStorage.SuspiciousActivityReportDetails.NonComplianceDetails.filter(items => items.IsRemoved != true);
    }
  }

  addRefDetails(refDetails: NgForm) {
    // if (this.sarData.SuspiciousActivityReportDetails.SarsRefDetails) {

    //   let filteredList = this.sarData.SuspiciousActivityReportDetails.SarsRefDetails.filter(SarsRefDetails => SarsRefDetails.IsRemoved != true);
    //   let numberAlreadyAdd = filteredList.length;

    //   if (this.numberToRepeatComp == numberAlreadyAdd) {

    //     swal(
    //       'Record',
    //       'You Can Not Add More Then Number of Companies/trader/ importer/exporters field',
    //       'error'
    //     )

    //     return;
    //   }

    // }


    if (this.sarData.SuspiciousActivityReportDetails.SarsRefDetails == null) {
      this.sarData.SuspiciousActivityReportDetails.SarsRefDetails = [];
    }
    let oneField = 0;
    if (refDetails.controls.CustomsExciseCode.value !== undefined && refDetails.controls.CustomsExciseCode.value !== null && refDetails.controls.CustomsExciseCode.value !== "") {
      oneField++;
    }
    if (refDetails.controls.CompanyNumber.value !== undefined && refDetails.controls.CompanyNumber.value !== null && refDetails.controls.CompanyNumber.value !== "") {
      oneField++;
    }
    if (refDetails.controls.IncomeTax.value !== undefined && refDetails.controls.IncomeTax.value !== null && refDetails.controls.IncomeTax.value !== "") {
      oneField++;
    }
    if (refDetails.controls.VAT.value !== undefined && refDetails.controls.VAT.value !== null && refDetails.controls.VAT.value !== "") {
      oneField++;
    }
    if (oneField == 0) {
      swal({ type: 'error', title: 'Required Fields', text: 'Please capture at least one field', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })
      refDetails.resetForm();

      return;
    }
    this.sarData.SuspiciousActivityReportDetails.SarsRefDetails.push(refDetails.value);
    this.sarRefList = this.sarData.SuspiciousActivityReportDetails.SarsRefDetails;
    refDetails.resetForm();
    this.items = this.sarData.SuspiciousActivityReportDetails.SarsRefDetails.filter(SarsRefDetails => SarsRefDetails.IsRemoved != true);

    this.displayDialog = false;
  }

  addEntityDetails(entityDetails: NgForm) {

    let noValueAssigned = true;
    Object.keys(entityDetails.value).every(function (el, index, array) {
      if (entityDetails.value[el]) {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })


    if (noValueAssigned) {
      swal(
        'Entity Details',
        'At least one value must be captured for Entity details',
        'error'
      )
      return;
    }

    // if (this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails) {


    //   let filteredList = this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails.filter(EntityTypeDetails => EntityTypeDetails.IsRemoved != true);
    //   let numberAlreadyAdd = filteredList.length;

    //   if (this.numberToRepeatComp == numberAlreadyAdd) {

    //     swal(
    //       'Record',
    //       'You Can Not Add More Then Number of Companies/trader/ importer/exporters field',
    //       'error'
    //     )

    //     return;
    //   }


    // }



    if (this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails == null) {
      this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails = []
    }
    this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails.push(entityDetails.value);

    this.entItems = this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails.filter(EntityTypeDetails => EntityTypeDetails.IsRemoved != true)
    this.entityDisplayDialog = false;
    entityDetails.resetForm();
  }
  addReportedPersonDetails(reportedPerson: NgForm) {

    let noValueAssigned = true;
    Object.keys(reportedPerson.value).every(function (el, index, array) {
      if (reportedPerson.value[el] && el !== 'CountryPersonCodeObject') {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })

    let countryCode = reportedPerson.value.CountryPersonCodeObject.CountryCode;
    if (reportedPerson.value.CountryPersonCodeObject.CountryCode) {
      countryCode = reportedPerson.value.CountryPersonCodeObject.CountryCode.trim();
    }

    if (noValueAssigned && (!countryCode || countryCode === '')) {
      swal(
        'Person Details',
        'At least one value must be captured for person details',
        'error'
      )
      return;
    }

    if (this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails == null) {
      this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails = []

    }

    if (reportedPerson.value.CountryPersonCodeObject != null) {
      reportedPerson.value.PassportCountry = reportedPerson.value.CountryPersonCodeObject.CountryCode;
    }

    this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails.push(reportedPerson.value);
    reportedPerson.resetForm();
    this.repItems = this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails.filter(ReportedPersonDetails => ReportedPersonDetails.IsRemoved != true)
    this.reportedPersonDisplayDialog = false;
  }

  addResBusinessAddress(resBus: NgForm) {

    let noValueAssigned = true;
    Object.keys(resBus.value).every(function (el, index, array) {
      if (resBus.value[el] && el !== 'CountryCodeObject') {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })

    let countryCode = '';
    if (resBus.value.CountryCodeObject != null) {

      countryCode = resBus.value.CountryCodeObject.CountryCode;
      if (resBus.value.CountryCodeObject.CountryCode) {
        countryCode = resBus.value.CountryCodeObject.CountryCode.trim();
      }

    }

    if (noValueAssigned && (!countryCode || countryCode === '')) {
      swal(
        'Business Address',
        'At least one value must be captured for business address',
        'error'
      )
      return;
    }

    if (this.sarData.SuspiciousActivityReportDetails.ResidentialBusinessAddress == null) {
      this.sarData.SuspiciousActivityReportDetails.ResidentialBusinessAddress = []
    }

    if (resBus.value.CountryCodeObject != null) {
      resBus.value.CountryCode = resBus.value.CountryCodeObject.CountryCode;
    }

    this.sarData.SuspiciousActivityReportDetails.ResidentialBusinessAddress.push(resBus.value);
    resBus.resetForm();
    this.resItems = this.sarData.SuspiciousActivityReportDetails.ResidentialBusinessAddress.filter(ResidentialBusinessAddress => ResidentialBusinessAddress.IsRemoved != true);
    this.residentialBusinessDisplayDialog = false;
  }

  addNonComplianceDetails(nonCompliance: NgForm) {

    if (this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails == null) {

      this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails = [];
    }

    this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails.push(nonCompliance.value);
    nonCompliance.resetForm();
    this.nonComItems = this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails.filter(NonComplianceDetails => NonComplianceDetails.IsRemoved != true);
    this.noncomplianceDetailsDisplayDialog = false;
  }


  onRefDetailsRemove(item, i) {
    item.IsRemoved = true;
    this.items.splice(i, 1);
  }
  entityTypeDetailsRemove(entItem, i) {
    entItem.IsRemoved = true;
    this.entItems.splice(i, 1);
  }

  reportedPersonDetailsRemove(repItem, i) {
    repItem.IsRemoved = true;
    this.repItems.splice(i, 1);
  }

  residentialBusinessAddressRemove(resItem, i) {
    resItem.IsRemoved = true;
    this.resItems.splice(i, 1);

  }

  onNonComplianceDataRemove(nonComItem, i) {
    nonComItem.IsRemoved = true;
    this.nonComItems.splice(i, 1);
  }


  onRefDetailsEdit(SarsRefDetail, refDetails: NgForm, i) {

    this.SarRefIndex = i
    if (this.refDetailsData) {
      this.refDetailsData
    }
    this.disableRefSaveButton = true;
    this.disableRefButton = false;
    this.refDetailsData = SarsRefDetail;

    this.displayDialog = true;
  }

  entityDetailsEdit(entityDetail, entityDetails, i) {
    this.disableEntButton = false;
    this.disableEntSaveButton = true;

    this.EntityIndex = i
    this.entityDetailsData = entityDetail;
    this.entityDisplayDialog = true;

  }
  reportedPersonDetailsEdit(reportedPersonDetail, reportedPerson, i) {
    if (reportedPersonDetail.PassportCountry != null && this.countryCodes.filter(x => x.CountryCode == reportedPersonDetail.PassportCountry).length > 0) {
      reportedPersonDetail.CountryCodeObject = this.countryCodes.filter(x => x.CountryCode == reportedPersonDetail.PassportCountry)[0];
    }

    this.disableRepButton = false;
    this.disableRepSaveButton = true;
    this.RepPersonIndex = i;

    this.reportedPersonData = reportedPersonDetail;
    this.reportedPersonDisplayDialog = true;
  }

  resBusinessAddressEdit(residentialBusinessDeatils, resBus, i) {

    if (residentialBusinessDeatils.CountryCode != null && this.countryCodes.filter(x => x.CountryCode == residentialBusinessDeatils.CountryCode).length > 0) {
      residentialBusinessDeatils.CountryCodeObject = this.countryCodes.filter(x => x.CountryCode == residentialBusinessDeatils.CountryCode)[0];

    }

    this.disableRepBusButton = false;
    this.disableRepBusSaveButton = true;
    this.ResBusIndex = i;
    this.residentialBusinessData = residentialBusinessDeatils;
    this.residentialBusinessDisplayDialog = true;
  }

  NonComplianceDetailsEdit(nonComDetail, nonCompliance, i) {
    this.disableNonComButton = false;
    this.disableNonComSaveButton = true;
    this.NonComIndex = i;
    this.nonComplianceData = nonComDetail;
    this.noncomplianceDetailsDisplayDialog = true;
  }


  onDoneEditDetails(dataObj, refDetails) {

    let oldData = this.sarData.SuspiciousActivityReportDetails.SarsRefDetails;

    let updatedobject = refDetails.value;

    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.SarRefIndex);

    this.refDetailsData = new RefDetailsClass();
    this.displayDialog = false;

  }



  doneEntityDetailsEdit(dataObj, entityDetails) {

    let noValueAssigned = true;
    Object.keys(entityDetails.value).every(function (el, index, array) {
      if (entityDetails.value[el]) {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })


    if (noValueAssigned) {
      swal(
        'Entity Details',
        'At least one value must be captured for Entity details',
        'error'
      )
      return;
    }

    let oldData = this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails;

    let updatedobject = entityDetails.value;

    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.EntityIndex);

    this.entityDetailsData = new EntityDetailsClass();
    this.entityDisplayDialog = false;

  }
  doneReportedPersonDetailsEdit(dataObj, reportedPerson) {

    let noValueAssigned = true;
    Object.keys(reportedPerson.value).every(function (el, index, array) {
      if (reportedPerson.value[el] && el !== 'CountryPersonCodeObject') {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })

    let countryCode = '';
    if (reportedPerson.value.CountryPersonCodeObject != null) {

      countryCode = reportedPerson.value.CountryPersonCodeObject.CountryCode;
      if (reportedPerson.value.CountryPersonCodeObject.CountryCode) {
        countryCode = reportedPerson.value.CountryPersonCodeObject.CountryCode.trim();
      }

    }

    if (noValueAssigned && (!countryCode || countryCode === '')) {
      swal(
        'Person Details',
        'At least one value must be captured for person details',
        'error'
      )
      return;
    }

    let oldData = this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails;

    if (reportedPerson.value.CountryPersonCodeObject != null) {
      reportedPerson.value.PassportCountry = reportedPerson.value.CountryPersonCodeObject.CountryCode;
    }

    let updatedobject = reportedPerson.value;

    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.RepPersonIndex);

    this.reportedPersonData = new ReportedPersonClass();
    // this.datePickerDate = null;
    this.reportedPersonDisplayDialog = false;

  }

  doneResBusinessAddressEdit(dataObj, resBus) {

    let noValueAssigned = true;
    Object.keys(resBus.value).every(function (el, index, array) {
      if (resBus.value[el] && el !== 'CountryCodeObject') {
        noValueAssigned = false;
      }
      return noValueAssigned;
    })

    let countryCode = '';
    if (resBus.value.CountryCodeObject != null) {

      countryCode = resBus.value.CountryCodeObject.CountryCode;
      if (resBus.value.CountryCodeObject.CountryCode) {
        countryCode = resBus.value.CountryCodeObject.CountryCode.trim();
      }

    }

    if (noValueAssigned && (!countryCode || countryCode === '')) {
      swal(
        'Business Address',
        'At least one value must be captured for business address',
        'error'
      )
      return;
    }


    let oldData = this.sarData.SuspiciousActivityReportDetails.ResidentialBusinessAddress;

    if (resBus.value.CountryCodeObject != null) {
      resBus.value.CountryCode = resBus.value.CountryCodeObject.CountryCode;
    }

    let updatedobject = resBus.value;

    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.ResBusIndex);

    this.residentialBusinessData = new ResidentailBusinessAddressClass();
    this.residentialBusinessDisplayDialog = false;

  }

  doneNonComplianceDeatilsEdit(dataObj, nonComDetails) {
    let oldData = this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails;
    let updatedobject = nonComDetails.value;

    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.NonComIndex);

    this.nonComplianceData = new NoncomplianceDetailsClass();
    this.noncomplianceDetailsDisplayDialog = false;
  }

  onSave(sarObj, sarform: NgForm) {
    if (this.sarData.SuspiciousActivityReportDetails.CaseDetails.ReferenceNumber == null) {
      sarObj.IsEdit = false;
      sarObj.SuspiciousActivityReportDetails.CaseDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    } else {
      sarObj.isEdit = true;
    }
    if (this.uploadedDocs.documentUploadStroage != null) {
      sarObj.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }

    if (!sarform.valid) {

      swal({ type: 'error', title: 'Record', text: 'Please Capture All The Fields In Case Details and Person Reporting Details', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })
      return;
    }
    if (sarObj.isEdit == true) {
      this.SaveSarRecord(sarObj);
    } else {
      swal({
        title: 'Information',
        text: "SAR information in WIP for only 48 hours, do you want to continue saving?",
        showCancelButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {

          this.SaveSarRecord(sarObj);
        }
      })
    }
  }

  SaveSarRecord(sarObj) {
    sarObj.SuspiciousActivityReportDetails.ReportedPersonDetails.forEach(element => {
      if (element.DateOfBirth.formatted != null)
        element.DateOfBirth = element.DateOfBirth.formatted;
    });
    this.isPostActionCompleted = true;
    this._sarService.saveSar(sarObj)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (res != null && this.repType.Success == 1) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass()

          if (this.repType != null && this.repType.Success == "1") {
            if (sarObj.IsEdit == true) {

              swal({ type: 'success', title: 'Record', text: 'SAR Updated  Successfully', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })


            } else {

              swal({ type: 'success', title: 'Record', text: 'SAR Saved Successfully and case ref No. is : ' + this.repType.Message + ' ', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

            }
          }
          this.onCancel();
        }

        else {

          swal({ type: 'success', title: 'Record', text: 'Failed to save SAR ' + res + ' ', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

        }

      },
        error => this.errorMessage = <any>error);
  }

  submitSar(sarData, sarform: NgForm) {
    sarData.SuspiciousActivityReportDetails.CaseDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    if (this.uploadedDocs.documentUploadStroage != null) {
      sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }

    if (!sarform.valid) {

      swal(
        'Record',
        'Please Capture All The Fields In Case Details and Person Reporting Details',
        'error'
      )
      return;
    }

    if (this.sarData.SuspiciousActivityReportDetails.SarsRefDetails.length == 0 || this.sarData.SuspiciousActivityReportDetails.SarsRefDetails == null) {

      swal(
        'Record',
        'At least One SARS Ref Details must be captured',
        'error'
      )
      return;
    }

    if (this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails.length == 0 || this.sarData.SuspiciousActivityReportDetails.NonComplianceDetails == null) {

      swal(
        'Record',
        'At least One Non Compliance Details Must be Captured',
        'error'
      )
      return;

    }
    if (this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails) {
      let numberEntityCon = this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails.filter(x => !x.IsRemoved).length;
      let numberToReport = Number(this.sarData.SuspiciousActivityReportDetails.CaseDetails.NumEntityTypes);
      if (numberEntityCon < numberToReport) {

        swal(
          'Record',
          'The number of records added on Entity Type Details section does not correspond to the value supplied for the selected Client Type',
          'error'
        )

        return;
      }
    }

    if (this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails) {
      let numberOfReportedPerson = this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails.filter(y => !y.IsRemoved).length;
      let numberToReportReportedPerson = Number(this.sarData.SuspiciousActivityReportDetails.CaseDetails.NumTravellersIndividuals)
      if (numberOfReportedPerson < numberToReportReportedPerson) {

        swal(
          '',
          'The number of records added on Reported Person Details section does not correspond to the value supplied for the selected Client Type',
          'error'
        )
        return
      }

    }
    this.isPostActionCompleted = true;
    this._sarService.submitSar(sarData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (this.repType != null && this.repType.Success != 0) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass();
          swal(
            'Record',
            'SAR Submitted Successfully and case ref No. is : ' + this.repType.Message,
            'success'
          )
          this.onCancel();;

        }

      },
        error => this.errorMessage = <any>error);


  }

  acceptSARReview() {

    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }
    this.sarData.IsEdit = true;
    this.isPostActionCompleted = true;
    this._sarService.acceptSARReview(this.sarData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (this.repType != 0) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass();
          swal(
            'Record',
            'SAR case has been submitted to CRCS Ops Manager to start the allocation process',
            'success'
          )
          this.onCancel();;

        }

      },
        error => this.errorMessage = <any>error);
  }
  acceptSARAnalysis() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }

    this.sarData.IsEdit = true;
    this.isPostActionCompleted = true;
    this._sarService.acceptSARAnalysis(this.sarData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (this.repType != 0) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass();
          swal(
            'Record',
            'SAR case has been accepted',
            'success'
          )
          this.onCancel();;

        }

      },
        error => this.errorMessage = <any>error);
  }


  rejectSARReview() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }
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
        this.notesService.savenote(this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId, result.value)
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
                  this._sarService.rejectSARReview(this.sarData)
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.repType = res;
                      if (this.repType != 0) {
                        this.items = [];
                        this.entItems = [];
                        this.repItems = [];
                        this.resItems = [];
                        this.nonComItems = [];
                        this.uploadedDocs.documentUploadStroage = null;
                        this.sarData = new SarClass();
                        swal({ type: 'success', title: 'Record', text: "SAR discarded successfully", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

                        this.onCancel();;

                      }

                    },
                      error => this.errorMessage = <any>error);
                }

              })

              this.commentsCaseId = this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId;

      }
    })

  }


  closeReviewedSarCase() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }
    this.isPostActionCompleted = true;
    this._sarService.closeReviewedSarCase(this.sarData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (this.repType != 0) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass();
          swal(
            'Record',
            'Case closed successfully for excise cases',
            'success'
          )
          this.onCancel();

        }

      },
        error => this.errorMessage = <any>error);
  }



  qaAcceptDiscardedReview() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }
    this.isPostActionCompleted = true;
    this._sarService.qaAcceptDiscardedReview(this.sarData)
      .subscribe(res => {
        this.isPostActionCompleted = false;
        this.repType = res;
        if (this.repType != 0) {
          this.items = [];
          this.entItems = [];
          this.repItems = [];
          this.resItems = [];
          this.nonComItems = [];
          this.uploadedDocs.documentUploadStroage = null;
          this.sarData = new SarClass();

          swal({ type: 'success', title: 'Record', text: "Case successfully closed", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

          this.onCancel();;

        }

      },
        error => this.errorMessage = <any>error);
  }

  getRegion() {
    this._sarService.getRegion()
      .subscribe(res => {
        if (res != null) {
          this.regionItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }



  getGetClientType() {
    this._sarService.getGetClientType()
      .subscribe(travellerlist => {
        this.travellerList = travellerlist;
        let clientTypeObj = travellerlist.filter(Y => Y.Description !== 'Select');

        let defaultTravelObject = travellerlist.find(Y => Y.Description === 'Select');

        if (defaultTravelObject != null &&
          this.sarData.SuspiciousActivityReportDetails.CaseDetails.ClientTypeId == null) {
          defaultTravelObject.ClientTypeId = null;
          this.sarData.SuspiciousActivityReportDetails.CaseDetails.ClientTypeId = null;
        }

        this.CompanyTraderImporterExporter = clientTypeObj[0].ClientTypeId;
        this.TravellerIndividual = clientTypeObj[1].ClientTypeId;

      },
        error => this.errorMessage = <any>error);

  }

  // onCompanies() {
  //   this._sarService.getCompanies()
  //     .subscribe(companieslist => {
  //       this.companiesList = companieslist;
  //     },
  //       error => this.errorMessage = <any>error);

  // }
  onProvinces() {
    this._sarService.getProvinces()
      .subscribe(provinceslist => {
        this.provincesList = provinceslist;
      },
        error => this.errorMessage = <any>error);

  }
  onTimeFrame() {
    this._sarService.getTimeFrame()
      .subscribe(res => {

        let timeframeDefault = res.find(x => x.Description === 'Select');
        if (timeframeDefault != null) {
          timeframeDefault.TimeFrameId = null;
        }
        this.timeFrameList = res

      },
        error => this.errorMessage = <any>error);

  }
  onYearlyLoss() {
    this._sarService.getYearlyLoss()
      .subscribe(res => {
        this.yearlyLossList = res;
      },
        error => this.errorMessage = <any>error);

  }



  qaDisagreeDiscardSARForm() {
    if (this.uploadedDocs.documentUploadStroage != null) {
      this.sarData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    }

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
        this.notesService.savenote(this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId, result.value)
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
                  this._sarService.qaDisagreeDiscardSARForm(this.sarData)
                    .subscribe(res => {
                      this.isPostActionCompleted = false;
                      this.repType = res;
                      if (this.repType != 0) {
                        this.items = [];
                        this.entItems = [];
                        this.repItems = [];
                        this.resItems = [];
                        this.nonComItems = [];
                        this.uploadedDocs.documentUploadStroage = null;
                        this.sarData = new SarClass();
                        swal({ type: 'success', title: 'Record', text: "SAR discarded successfully", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })

                        this.onCancel();;

                      }

                    },
                      error => this.errorMessage = <any>error);
                }

              })

              this.commentsCaseId = this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId;

      }
    })

  }

  getValue(NumTravellersIndividuals) {
    this.numberToRepeat = NumTravellersIndividuals
  }

  getNoCompaniesValue(numEntityTypes) {
    this.numberToRepeatComp = numEntityTypes
  }

  getCustomsExcise() {
    this.lookservice.getCustomsExcise()
      .subscribe(res => {
        this.customsExciseLists = res.filter(i => i.Description != "");
        let exciseObje = res.filter(X => X.Description === 'Excise');
        this.isExcise = exciseObje[0].CustomsExciseId;

        let exciseDefaultObject = res.find(i => i.Description === 'Select');
        if (exciseDefaultObject != null && this.sarData.SuspiciousActivityReportDetails.CaseDetails.CustomsExciseId == null) {
          exciseDefaultObject.CustomsExciseId = null;
          this.sarData.SuspiciousActivityReportDetails.CaseDetails.CustomsExciseId = null;
        }

      },
        error => this.errorMessage = <any>error);

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
          this.pendCaseService.onPendCase(this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId, selectedDate)
            .then(
              this._router.navigate(['/dashboard']))
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
          this.pendCaseService.onUnPendCase(this.sarData.SuspiciousActivityReportDetails.CaseDetails.CaseId)
            .then(
              this._router.navigate(['/dashboard'])
            ).catch(
              swal("Failed to unpend case", "Case did not unpend, please try again later", "error")
            )
        }
      })
  }


  showRefDetails() {
    this.refDetailsData = new RefDetailsClass();
    this.displayDialog = true;
    this.disableRefButton = true;
    this.disableRefSaveButton = false;

  }
  showEntityDetails() {

    if (this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails) {
      let filteredList = this.sarData.SuspiciousActivityReportDetails.EntityTypeDetails.filter(EntityTypeDetails => EntityTypeDetails.IsRemoved != true);
      let numberAlreadyAdd = filteredList.length;

      if (this.numberToRepeatComp == undefined) {
        let value = this.sarData.SuspiciousActivityReportDetails.CaseDetails.NumEntityTypes;
        this.numberToRepeatComp = value;
      }

      if (this.numberToRepeatComp == numberAlreadyAdd || this.numberToRepeatComp == undefined) {
        swal(
          'Record',
          'You can not add more than number of companies/trader/ importer/exporters field',
          'error'
        )
        return;
      }
    }

    this.disableEntButton = true;
    this.disableEntSaveButton = false;
    this.entityDetailsData = new EntityDetailsClass();
    this.entityDisplayDialog = true;
  }

  showReportedPersonDetails() {


    if (this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails) {
      let filteredList = this.sarData.SuspiciousActivityReportDetails.ReportedPersonDetails.filter(ReportedPersonDetails => ReportedPersonDetails.IsRemoved != true);
      let numberAlreadyAdd = filteredList.length;

      if (this.numberToRepeat == undefined) {
        let value = this.sarData.SuspiciousActivityReportDetails.CaseDetails.NumTravellersIndividuals;
        this.numberToRepeat = value;
      }

      if (this.numberToRepeat == numberAlreadyAdd || this.numberToRepeat == undefined) {
        swal(
          'Record',
          'You can not add more than the number of travellers/individuals field',
          'error'
        )
        return;
      }
    }


    this.disableRepButton = true;
    this.disableRepSaveButton = false;
    this.reportedPersonData = new ReportedPersonClass();
    this.reportedPersonDisplayDialog = true;
  }

  showesidentailBusinessAddress() {
    this.disableRepBusButton = true;
    this.disableRepBusSaveButton = false;
    this.residentialBusinessData = new ResidentailBusinessAddressClass();
    this.residentialBusinessDisplayDialog = true;
  }

  showNoncomplianceDetailsDetails() {


    this.disableNonComButton = true;
    this.disableNonComSaveButton = false;
    this.nonComplianceData = new NoncomplianceDetailsClass();
    this.nonComplianceData.TimeFrameId = null;

    let yearLossDefault = this.yearlyLossList.find(x => x.Description === 'Select');
    if (yearLossDefault != null) {
      this.nonComplianceData.YearlyLossId = yearLossDefault.YearlyLossId;
    }

    this.noncomplianceDetailsDisplayDialog = true;
  }

  checkDobONoID(event, iDNumber?, dob?, reportedPerson?: NgForm) {
    if (event.target.value != "") {
      if ((iDNumber.value != "" && iDNumber.value != undefined) && (dob.value != "" && dob.value != undefined) ){
        let idDate = this.idValidBirthdate(iDNumber.value);
        let dateOfBirth = dob.value;

        if (idDate.toString() != dateOfBirth.toString()) {
          swal("", "The first 6 numbers of the ID Number must correspond with Date of Birth (YYMMDD)", "error");
          event.target.value = null;
          this.reportedPersonData.IDNumber = null;

        }
      }
    }
  }

  private idValidBirthdate(idNumber): Date {
    let year = idNumber.substring(0, 2);
    let currentYear = new Date().getFullYear() % 100;
    let prefix = "19";

    if (+year < currentYear)
      prefix = "20";

    var month = idNumber.substring(2, 4);
    var day = idNumber.substring(4, 6);
    return new Date(prefix + year + "/" + month + "/" + day);

  }


  getCountryCodes() {
    this.lookservice.getCountryCodes()
      .subscribe(res => {
        this.countryCodes = res;
      },
        error => {
          this.errorMessage = <any>error;
        });
  }

  getProvinces() {
    this.lookservice.getProvinces()
      .subscribe(res => {
        this.provinces = res;
      },
        error => {
          this.errorMessage = <any>error;
        });
  }


  requiredProvince(residentialBusinessData) {

    return (residentialBusinessData.CountryCodeObject != null &&
      residentialBusinessData.CountryCodeObject.CountryCode != null &&
      residentialBusinessData.CountryCodeObject.CountryCode.trim() == 'ZAF');
  }

  requiredPersonProvince(reportedPersonDetail) {

    return (reportedPersonDetail.CountryCodeObject != null &&
      reportedPersonDetail.CountryCodeObject.CountryCode != null &&
      reportedPersonDetail.CountryCodeObject.CountryCode.trim() == 'ZAF');
  }

  searchCountry(event) {
    if (event.query == '') {
      // this.resultsCountryCodes = this.countryCodes;
    }
    else {
      this.resultsCountryCodes = this.countryCodes.filter(x => x.CountryName.toLowerCase().includes(event.query.toLowerCase()));
    }

  }

  defaultLookupOption(defaultOption) {
    return defaultOption.Description === 'Select';
  }


  defaultRequiredOption() {
    return true;
  }

  goBack() {

    // if(this.buttonsToShow)
    // {
    // var actionLink = '/'+ this.buttonsToShow;
    // this._router.navigate([actionLink]);
    // }

    if (this.buttonsToShow == "Reallotesar") {

      this._router.navigate(["/reallotesar"]);
    } else {
      this._router.navigate(["/allocatesar"]);
    }
  }


}
