import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { IRiskAssessment } from 'app/crcs-specialist/risk-assessment';
import { PagerService } from '../../shared-services/pager.service';
import { RiskasessmentComponent } from '../riskasessment/riskasessment.component';
import { RiskAssessmentReportCase } from '../risk-assessment-class';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crcsworkinprogress',
  templateUrl: './crcsworkinprogress.component.html',
  styleUrls: ['./crcsworkinprogress.component.scss']
})
export class CrcsworkinprogressComponent implements OnInit {

  cpageTitle: string = ' RA Detail';
  errorMessage: string;
  whichRoleActive: String;
  WindowLabel:String;
  riskkAssessmentCombinedData: Array<RiskAssessmentReportCase>[];
  isLoaded:boolean = false;

  constructor(private _sarsServics: RiskAssessmentService, private _router: Router, private router: ActivatedRoute,
    private pagerService: PagerService, private riskAssessmentData: DataProvider) {
    this.whichRoleActive = router.snapshot.data["link"];
  }

  ngOnInit() {
    if (this.whichRoleActive == "rarework") {
      this.WindowLabel = "Risk Assessments Rework";
      this.riskAssessmentRework();
    }
    else {

      this._sarsServics.getriskAssments()
        .subscribe(raDetails => {

          if (raDetails != null) {
            this.riskkAssessmentCombinedData = raDetails;
          } else {
            swal("No Records Found!", "", "info");
          }
          this.isLoaded = true;
        },
          error => this.errorMessage = <any>error);

          this.WindowLabel = "Work In Progress";
    }

  }

  riskAssessmentRework()
  {
    this._sarsServics.getreworkriskAssments()
    .subscribe(raDetails => {

      if (raDetails != null) {
        this.riskkAssessmentCombinedData = raDetails;
      } else {
        swal("No Records Found!", "", "info");
      }
      this.isLoaded = true;
    },
      error => this.errorMessage = <any>error);
  }

  onRAEdit(raDetails) {
    raDetails.Stage = "Edit";
    this.riskAssessmentData.riskAssessmentStorage = raDetails;
    this._router.navigate(['/createcrcs']);
  }

}
