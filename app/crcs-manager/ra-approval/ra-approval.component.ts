import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from '../../crcs-specialist/risk-assessment.service';
import { Router } from '@angular/router';
import { PagerService } from '../../shared-services/pager.service';
import { DataProvider } from '../../crcs-specialist/provider/data-provider';
import { IRiskAssessment } from '../../crcs-specialist/risk-assessment';
import { RiskasessmentComponent } from '../../crcs-specialist/riskasessment/riskasessment.component';
import { RiskAssessmentReportCase } from '../../crcs-specialist/risk-assessment-class';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ra-approval',
  templateUrl: './ra-approval.component.html',
  styleUrls: ['./ra-approval.component.scss']
})
export class RaApprovalComponent implements OnInit {
  constructor(private _sarsServics: RiskAssessmentService,private _router: Router,private pagerService: PagerService,private riskAssessmentData:DataProvider ) { }

  cpageTitle: string = ' RA Detail';
  errorMessage: string;
  riskkAssessmentCombinedData: Array<RiskAssessmentReportCase>[];
  isLoaded:boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  ngOnInit() {
    this._sarsServics.getApprovalRiskAssessmentForms()
    .subscribe(raDetails => {
      if(raDetails != null){
          this.riskkAssessmentCombinedData = raDetails;
      }else{
        swal("No Records Found!", "", "info");
      }  
      this.isLoaded =true;
    },
    error => this.errorMessage = <any>error);

  }

  onRAEdit(raDetails) {
    //  console.log(vddlDetail);
    raDetails.Stage = "Approval";
    this.riskAssessmentData.riskAssessmentStorage = raDetails;
    this._sarsServics.RA_Approval = true;
    this._sarsServics.RA_Fields = false;
    this._router.navigate(['/createcrcs']);
  }

}