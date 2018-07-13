import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { SarProvider } from '../../user/sar-provider';
import { Iuser } from '../../user/user-interface';
import swal from 'sweetalert2';
import { RiskAssessmentReportCase, RiskAssessmentClass } from '../risk-assessment-class';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';

@Component({
  selector: 'app-crscompleted-ratemplates',
  templateUrl: './crscompleted-ratemplates.component.html',
  styleUrls: ['./crscompleted-ratemplates.component.scss']
})
export class CrscompletedRatemplatesComponent implements OnInit {

 
  constructor(private _sarsServics: UserService ,private _router: Router, private riskAssessmentData:DataProvider,
      private sarData:SarProvider ) { }

  cpageTitle: string = ' SAR Detail';
  errorMessage: string;
  filteredsarDetails:Array<any> = new Array();
  sarDetails:Array<any> = new Array();

  _listFilter: string;
  isLoaded: boolean = false;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredsarDetails = this.listFilter ? this.performFilter(this.listFilter) : this.sarDetails;
  }


  performFilter(filterBy: string): Iuser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.sarDetails.filter((sarDetails: Iuser) =>
    sarDetails.CaseDetails.ReferenceNumber.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnInit(){
  
    this._sarsServics.getCompleteRATemplates()
      .subscribe(res => {     
        if(res != null){
          this.sarDetails = res;
          this.filteredsarDetails = new Array
          this.filteredsarDetails =  res;

        }else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
      error => this.errorMessage = <any>error);
      
  }
  // takes you back to sar screen for editing
  onSarCreateTemplate(sarDetails) {
    //  console.log(vddlDetail);
    // this.sarData.sarStorage = sarDetails;
    //  this._router.navigate(['/editsar']);


    this.riskAssessmentData.riskAssessmentStorage = new RiskAssessmentReportCase()
    this.riskAssessmentData.riskAssessmentStorage.RiskAssessmentReportResult = new RiskAssessmentClass();
    this.riskAssessmentData.riskAssessmentStorage.RiskAssessmentReportResult.CaseId = sarDetails.SuspiciousActivityReportDetails.CaseDetails.CaseId
    this.riskAssessmentData.riskAssessmentStorage.Stage = "New";
 
     // this._raComponent.RA_Approval = true;
     // this._raComponent.RA_Fields = false;
     this._router.navigate(['/createcrcs']);
  }

    // takes you back to sar screen for editing
    onSarEdit(sarDetails) {
      //  console.log(vddlDetail);
      this.sarData.sarStorage = sarDetails;
       this._router.navigate(['/editsar']);
    }

}
