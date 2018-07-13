import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from '../risk-assessment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../shared-services/pager.service';
import { DataProvider } from '../provider/data-provider';
import { RiskAssessmentReportCase } from '../risk-assessment-class';
import swal from 'sweetalert2';


@Component({
  selector: 'app-technicalreview',
  templateUrl: './technicalreview.component.html',
  styleUrls: ['./technicalreview.component.scss']
})
export class TechnicalreviewComponent implements OnInit {
  constructor(private _sarsServics: RiskAssessmentService,private router: ActivatedRoute, private _router: Router, private pagerService: PagerService, 
    private riskAssessmentData:DataProvider ) { 
      this.whichRoleActive = router.snapshot.data["link"];
    }

  cpageTitle: string = ' RA Detail';
  errorMessage: string;
  whichRoleActive:string;
  windowTitle:string;
  isLoaded:boolean = false;
  riskkAssessmentCombinedData: Array<RiskAssessmentReportCase>[];


  ngOnInit() {
    this._sarsServics.getTechnicalReviewRiskAssessmentForms(this.whichRoleActive)
    .subscribe(raDetails => {

      if(raDetails != null){
          this.riskkAssessmentCombinedData = raDetails;
      }else{
        swal("No Records Found!", "", "info");
      } 
      this.isLoaded = true; 
      this.getTechnicalReviewType();
    },
    error => this.errorMessage = <any>error);    
  }


  getTechnicalReviewType()
  {
    switch (this.whichRoleActive)
    {
      case 'getTechnicalReviewForms' :
      {
       this.windowTitle = "Technical Review Cases";
      } break;

      case 'getApprovedTechnicalReviewForms': 
      {
        this.windowTitle = "Approved Technical Review Cases";
      } break;

      case 'getApprovedTechnicalReviewQAList':
      {
        this.windowTitle = "Approved Technical Review Cases";
      } break;

      case 'getRejectedTechnicalReviewForms':
      {
        this.windowTitle = "Approved Technical Review Cases";
      } break;

    }
  }

  
  

  onRAEdit(raDetails) {
    raDetails.Stage = "Edit";
    this.riskAssessmentData.riskAssessmentStorage = raDetails;
    this.riskAssessmentData.riskAssessmentStorage.Stage = this.whichRoleActive;

    this._router.navigate(['/createcrcs']);
  }
}
