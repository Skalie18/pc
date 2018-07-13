import { Component, OnInit } from '@angular/core';
import { ReportCriteriaDisplay, ColumnInfo, ReportResult, PCA_Report } from '../reportcriteria';
import { ReportsServiceService } from '../reports-service.service';
import swal from 'sweetalert2';
import { LookUpService } from '../../lookUp/lookup.service';
import { ExportToExcelService } from '../../shared-services/export-to-excel.service';
import { ExportToPdfService } from '../../shared-services/export-to-pdf.service';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss']
})

export class ReportsViewComponent implements OnInit {
  reportCriteriaDisplay: ReportCriteriaDisplay = new ReportCriteriaDisplay();
  reportData: any[];
  reportColumns: ColumnInfo[];
  reportStatuses: any[];
  reportsCollection: PCA_Report[];
  reportsFilteredCollection: ReportResult[];
  reportsRegions: any[];
  currentReportID: string
  currentReportResult: ReportResult = new ReportResult();

  errorMessage: string;
  loading: boolean;
  displayReportDiaLog: boolean = false;
  reportDescription: string;



  constructor(private reportsService: ReportsServiceService, private lookUpService: LookUpService, private jsonXcel:ExportToExcelService, private jsonPdf:ExportToPdfService) { }

  ngOnInit() {
    this.loading = true;
    this.getRegion();
    this.getStatuses();
    this.getreportsWithFilters();
    this.reportDescription = "Reports"
  }

  getReportData() {
    this.reportsService.getreportData(this.currentReportResult)
      .subscribe(reportResult => {
        if (reportResult != null && reportResult.QueryResults != null) {
          this.reportData = reportResult.QueryResults;
          this.reportColumns = reportResult.ColumnInfos;
          this.reportDescription = this.currentReportResult.Report.Name;
        } else {
          swal("No Report Data", "", "info");
          this.reportDescription = "Reports";
          this.reportColumns = [];
          this.reportData = [];

        }
      },
        error => this.errorMessage = <any>error);
  }


  getreports() {
    this.reportsService.getreports()
      .subscribe(result => {
        if (result != null) {
          this.reportsCollection = result;
        }
      },
        error => this.errorMessage = <any>error);
  }

  getreportsWithFilters() {
    this.reportsService.getreports()
      .subscribe(result => {
        if (result != null) {
          this.reportsFilteredCollection = result;
        }
      },
        error => this.errorMessage = <any>error);
  }

  getRegion() {
    this.lookUpService.getRegion()
      .subscribe(res => {
        let rItems = res;
        if (rItems != null) {
          this.reportsRegions = rItems;
        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error);
  }

  getStatuses() {
    this.lookUpService.getStatuses()
      .subscribe(res => {
        let rItems = res;
        if (rItems != null) {
          rItems.forEach(element => {
            element.label = element.Description;
          });
          this.reportStatuses = rItems;
        } else {
          swal("No Records Found!", "", "info");
        }

      },
        error => this.errorMessage = <any>error);

  }

  generateReport() {

    if (this.currentReportResult.Filters != null && this.currentReportResult.Filters.length > 0) {
      if (this.currentReportResult.Filters.find(x => x.FilterName == 'Status') != null) {
        this.currentReportResult.Filters.find(x => x.FilterName == 'Status').Value = this.reportCriteriaDisplay.StatusValue
      };

      if (this.currentReportResult.Filters.find(x => x.FilterName == 'Region') != null) {
        this.currentReportResult.Filters.find(x => x.FilterName == 'Region').Value = this.reportCriteriaDisplay.RegionValue;
      }

      if (this.currentReportResult.Filters.find(x => x.FilterName == 'StartDate') != null) {
        this.currentReportResult.Filters.find(x => x.FilterName == 'StartDate').Value = this.reportCriteriaDisplay.StartDate;
      }

      if (this.currentReportResult.Filters.find(x => x.FilterName == 'EndDate') != null) {
        this.currentReportResult.Filters.find(x => x.FilterName == 'EndDate').Value = this.reportCriteriaDisplay.EndDate;
      }
    }

    this.getReportData();
    this.cancel();
  }

  cancel() {
    this.displayReportDiaLog = false;
  }

  launchReportFilter() {
    this.displayReportDiaLog = true;
  }

  reportChange() {
    var actionReport = this.reportsFilteredCollection.filter(x => x.Report.ID == this.currentReportID);

    if (actionReport != null && actionReport.length > 0) {
      this.currentReportResult = actionReport[0];

      if (actionReport[0].Filters != null) {
        var currentFilter = actionReport[0].Filters.filter(x => x.FilterName == 'Status');
        this.reportCriteriaDisplay.StatusVisible = currentFilter.length > 0 ? currentFilter[0].Visible : false;
      }
    }
  }


  JsonToExcel(){
    this.jsonXcel.exportAsExcelFile(this.reportData, this.reportDescription)

  }

  jsonToPdf(){
    this.jsonPdf.exportToPdf(this.reportData, this.reportColumns,  this.reportDescription);
  }

}
