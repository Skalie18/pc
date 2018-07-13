import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from '../risk-assessment.service';
import { Router } from '@angular/router';
import { PagerService } from '../../shared-services/pager.service';
import { DataProvider } from '../provider/data-provider';
import { RiskAssessmentReportCase } from '../risk-assessment-class';
import swal from 'sweetalert2';

@Component({
  selector: 'app-approvedassessment',
  templateUrl: './approvedassessment.component.html',
  styleUrls: ['./approvedassessment.component.scss']
})
export class ApprovedassessmentComponent implements OnInit {
  constructor(private _sarsServics: RiskAssessmentService, private _router: Router, private pagerService: PagerService, 
    private riskAssessmentData:DataProvider ) { }

  cpageTitle: string = ' RA Detail';
  errorMessage: string;

  riskkAssessmentCombinedData: Array<RiskAssessmentReportCase>[];
  isLoaded:boolean = false;

  ngOnInit() {
    this._sarsServics.getApprovedRiskAssessmentForms()
    .subscribe(raDetails => {

      if(raDetails != null){
          this.riskkAssessmentCombinedData = raDetails;
      }else{
        swal("No Records Found!", "", "info");
      }  
      this.isLoaded = true;
    },
    error => this.errorMessage = <any>error);

  }

  onRAEdit(raDetails) {
    raDetails.Stage = "Edit";
    this.riskAssessmentData.riskAssessmentStorage = raDetails;
    // this._raComponent.RA_Approval = true;
    // this._raComponent.RA_Fields = false;
    this._router.navigate(['/createcrcs']);
  }


}
