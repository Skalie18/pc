import { Component, OnInit } from '@angular/core';
import { SearchDataService } from 'app/search/search-data.service';
import { ISearch } from 'app/search/search-interface';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { VdDlDataService } from 'app/client-interface/vd-dl-data.service';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { IVddl } from 'app/client-interface/vd-dl-interface';
import { UserService } from 'app/user/user.service';
import { SarProvider } from 'app/user/sar-provider';
import { SelectItem } from 'primeng/primeng';
import { SearchParamsClass } from '../searchParams-class';
import { ISarInterface } from '../../user/sar-interface';
import { AuditDataproviderService } from '../../ci-auditor/audit-dataprovider-service.service';
import { RiskAssessmentService } from '../../crcs-specialist/risk-assessment.service';
import { IRiskStatementInterface } from '../../crcs-specialist/risk-statement-interface';
import { IRiskAssessment } from '../../crcs-specialist/risk-assessment';

@Component({
  selector: 'app-search',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchComponent implements OnInit {
  viewTitle: String;
  filteredSearchResults: ISearch[];
  searchResults: ISearch[] = [];
  historyResults: ISearch[] = [];
  errorMessage: string;
  FormTypeId = '';
  refNumber = '';
  exciseCode = '';
  companyNumber = '';
  tradingName = '';
  sid = '';
  startDate = '';
  endDate = '';
  VATNo = '';
  incomeTaxNo = '';
  manager = false;
  allUsers = false;
  selectedVddl: IVddl;
  selectedSAR: ISarInterface;
  selectedRA: IRiskAssessment;
  _listFilter: string;
  displaySearchDiaLog = false;
  displayHistoryDiaLog = false;
  searchCollection: any[];
  userRole: String = '';
  currentStatus: SelectItem[];
  masterStatus: SelectItem[];
  caseTypes: SelectItem[];
  searchParameters: SearchParamsClass;
  sIds: SelectItem[];
  isLoaded = true;
  isPostActionCompleted = false;
  isFiltered = false;
  isSortable = false;
  constructor(
    private searchData: SearchDataService,
    private _router: Router,
    private _vddlService: VdDlDataService,
    private vddlData: vddlDataProvider,
    private sardata: SarProvider,
    private _sarService: UserService,
    private auditDataService: AuditDataproviderService,
    private _riskAssessmentService: RiskAssessmentService

  ) {}

  ngOnInit() {
    this.viewTitle = 'Search View ';

    this.searchData.getSearchType().subscribe(res => {
      if (res != null) {
        this.searchCollection = res;
      }
    }, error => (this.errorMessage = <any>error));
    this.userRole = this.searchData.getUserRole();
  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSearchResults = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.searchResults;
  }
  performFilter(filterBy: string): ISearch[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.searchResults.filter(
      (searchResult: ISearch) =>
        searchResult.TradingName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onSearch() {
    this.isPostActionCompleted = true;
    this.searchResults = [];
    this.displaySearchDiaLog = false;
    this.populateSearchParameters();
    this.searchData
      .getSearchData(
        this.searchParameters,
        this.allUsers
      )
      .subscribe(results => {
        if (results != null) {
          const temp = results;
          this.searchResults = results;
          this.createDropDownLists(results);
          this.isPostActionCompleted = false;
        } else {
          this.searchResults = [];
          this.createDropDownLists(null);
          this.isPostActionCompleted = false;
          swal('No Records Found!', '', 'info');
        }
      }, error => (this.errorMessage = <any>error));
  }

  private populateSearchParameters() {
    this.searchParameters = new SearchParamsClass;
    this.searchParameters.CaseRefNo = this.refNumber;
    this.searchParameters.FormTypeId = this.FormTypeId;
    this.searchParameters.CompanyRegNo = this.companyNumber;
    this.searchParameters.TradingName = this.tradingName;
    this.searchParameters.CustomsExciseCode = this.exciseCode;
    this.searchParameters.DateFrom = this.startDate;
    this.searchParameters.DateTo = this.endDate;
    this.searchParameters.VATNo = this.VATNo;
    this.searchParameters.IncomeTaxNo = this.incomeTaxNo;
    this.searchParameters.Manager = this.manager;
  }

  onRowSelect(item) {
    this.isPostActionCompleted = true;
    this.searchData.getCaseHistory(item.data.CaseId)
          .subscribe(res => {
            if (res != null ) {
              this.historyResults = res;
              this.displayHistoryDiaLog = true;
            } else {
              this.isPostActionCompleted = false;
            }
          });
  }

  onDialogShow(dialog) {
    setTimeout(() => {
        this.isPostActionCompleted = false;
        }, 10);
  }

  onLoadDetails(search: ISearch) {
    if (search.FormTypeId === 'VDDL') {
      const tempVdl = this._vddlService
        .getvddlbycaseid(search.CaseId)
        .subscribe(vddlDetails => {
          if (vddlDetails != null) {
            this.selectedVddl = vddlDetails;
            // this.selectedVddl.reduce()
            this.vddlData.vddlStorage = this.selectedVddl;
            this._router.navigate(['/editvddl']);
          }
        });
    } else if (search.FormTypeId === 'AUDIT') {
        // This code needs to be created in the RiskAssesmentservice and adapted to action each type of case depending on Status
        // const riskAssesmentDl = this._riskAssessmentService
        //                               .getriskAssmentbycaseId(search.CaseId)
        //                               .subscribe( riskDetails => {
        //                                 if (riskDetails != null) {
        //                                   this.selectedRA = riskDetails;
        //                                   this.auditDataService.auditDataStorage = this.selectedRA;
        //                                   this._router.navigate(['crcrcsworkinprogresscs']);
        //                                 }
        //                               });
      swal('Not Implemented', 'Case Type: <b>' + search.FormTypeId + '</b><br/>Active Status: <b>' + search.ActiveStatus
                    + '</b><br/>Case Ref Number: <b>' + search.CaseRefNo + '</b>' , 'info');
    } else if (search.FormTypeId === 'SAR') {
      // This code needs to be created in the SARService and adapted to action each type of case depending on Status
      // const sardl = this._sarService
      //                 .getsarsbycaseid(search.CaseId)
      //                 .subscribe( sarDetails => {
      //                   if (sarDetails != null ) {
      //                     this.selectedSAR = sarDetails;
      //                     this.sardata.sarStorage = this.selectedSAR;
      //                     this._router.navigate(['/editsar']);
      //                 }
      //            });
      swal('Not Implemented', 'Case Type: <b>' + search.FormTypeId + '</b><br/>Active Status: <b>' + search.ActiveStatus
                    + '</b><br/>Case Ref Number: <b>' + search.CaseRefNo + '</b>' , 'info');
    }
  }

  launchSearchFilter() {
    this.displaySearchDiaLog = true;
  }
  cancel() {
    this.displaySearchDiaLog = false;
  }
  close() {
    this.displayHistoryDiaLog = false;
  }
  createDropDownLists(res) {
    // do somthing
    this.currentStatus = [];
    this.masterStatus = [];
    this.caseTypes = [];
    this.sIds = [];
    if (res === null ) {
        return;
    } else {
      this.currentStatus.push({label: 'All', value: null});
      const statuses = this.summariseData(res, 'ActiveStatus');
      statuses.forEach(e => {
        this.currentStatus.push({label: e[0], value: e[0]});
      });

      this.masterStatus.push({label: 'All', value: null});
      const masters = this.summariseData(res, 'MasterStatus');
      masters.forEach(e => {
        this.masterStatus.push({label: e[0], value: e[0]});
      });

      this.caseTypes.push({label: 'All', value: null});
      const cases = this.summariseData(res, 'FormTypeId');
      cases.forEach(e => {
        this.caseTypes.push({label: e[0], value: e[0]});
      });
      this.sIds.push({label: 'All', value: null});
      const users = this.summariseData(res, 'Sid');
      users.forEach(e => {
        this.sIds.push({label: e[0], value: e[0]});
      });
    }
  }


  summariseData(data: any, fieldname: string): any {
    return function (data) {
      const r = [];
      data.forEach(function (a) {
        if (!this[a[fieldname]]) {
          this[a[fieldname]] = [a[fieldname]];
          r.push(this[a[fieldname]]);
        }
      }, {});
      return r;
    }(data);
  }
}
