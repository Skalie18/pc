import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SarProvider } from '../../user/sar-provider';
import { ReviewerServiceService } from '../reviewer-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reviewer-workin',
  templateUrl: './reviewer-workin.component.html',
  styleUrls: ['./reviewer-workin.component.scss']
})
export class ReviewerWorkinComponent implements OnInit {

  gridItems:Array<any> = [];
  errorMessage:String;
  whichRoleActive:String;
  isLoaded:boolean = false;
  constructor(private _router: Router,private sarData:SarProvider, private reviewerService:ReviewerServiceService, private router: ActivatedRoute ) {

    this.whichRoleActive = router.snapshot.data["link"];
   }

  ngOnInit() {

    if(this.whichRoleActive== "rejectedsar"){
        this.GetQaDiscardedReviewCases();
    }

    if(this.whichRoleActive== "sarpendingreview"){ 
        this.getCasesPendingReview();
    }

    if(this.whichRoleActive != "rejectedsar" && this.whichRoleActive != "sarpendingreview"){
      this.isLoaded = true;
    }  
  }


  GetQaDiscardedReviewCases(){

    this.reviewerService.GetQaDiscardedReviewCases()
    .subscribe(res => {
      if(res!= null){
        this.gridItems =res;
      }else {
          swal("No Records Found!", "", "info");
      }
      this.isLoaded = true;
    
    },
    error => this.errorMessage = <any>error)

  }

  getNextCasePendingReviewer(){
    this.reviewerService.getNextCasePendingReview()
    .subscribe(res => {
      if(res != null){
        this.gridItems.push(res);
      }else {
        swal("No Records Found!", "", "info");
      }

    },
    error => this.errorMessage = <any>error)

  }

  // getCasesPendingReview
  getCasesPendingReview(){
    this.reviewerService.getCasesPendingReview()
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

    // takes you back to sar screen for editing
    onSarEdit(sarDetails) {
      //  console.log(vddlDetail);
      this.sarData.sarStorage = sarDetails;
       this._router.navigate(['/editsar',{view:"sarReviewer", role:this.whichRoleActive }]);
    }
}
