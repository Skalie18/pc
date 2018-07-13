import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SarProvider } from 'app/user/sar-provider';
import { QuilityAssurerService } from '../quility-assurer.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quility-assurer',
  templateUrl: './quility-assurer.component.html',
  styleUrls: ['./quility-assurer.component.scss']
})
export class QuilityAssurerComponent implements OnInit {

  gridItems:Array<any> = [];
  errorMessage:String;
  whichRoleActive:string;
  pageTitle:String;
  isLoaded:boolean = false;
  constructor(private _router: Router,private sarData:SarProvider, private qaSirvice:QuilityAssurerService, private router: ActivatedRoute) { 
    this.whichRoleActive = router.snapshot.data["link"];
  }

  ngOnInit() {

    if(this.whichRoleActive == "qareviewdiscardedanalysis"){
        this.getQAReviewDiscardedAnalysisForms();
        this.pageTitle = "Discarded SAR Case In-depth" 
    }else{
      this.getQaDiscardedReviewCases();
      this.pageTitle ="Discarded SAR Case Review";
    }

   
  }

  getQaDiscardedReviewCases(){
    this.qaSirvice.getQaDiscardedReviewCases()
    .subscribe(res => {
      if(res != null){
        this.gridItems =res ;
      }else {
        swal("No Records Found!", "", "info");
      }
      this.isLoaded = true;
    },
    error => this.errorMessage = <any>error)

  }

  getQAReviewDiscardedAnalysisForms(){
    this.qaSirvice.getQAReviewDiscardedAnalysisForms()
    .subscribe(res => {
      if(res != null){
        this.gridItems =res ;
      }else {
        swal("No Records Found!", "", "info");
      }
      this.isLoaded = true;
    },
    error => this.errorMessage = <any>error)


  }

  onSarEdit(sarDetails) {
    //  console.log(vddlDetail);
    this.sarData.sarStorage = sarDetails;
    this.sarData.sarStorage.Stage = this.pageTitle;
     this._router.navigate(['/editsar']);
  }
}
