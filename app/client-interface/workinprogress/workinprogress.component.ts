import { Component, OnInit } from '@angular/core';


import { VdDlDataService } from '../vd-dl-data.service';
import { IVddl } from '../vd-dl-interface';
import { error } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { IVddldetailsInterface } from '../vddldetails-interface';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-workinprogress',
  templateUrl: './workinprogress.component.html',
  styleUrls: ['./workinprogress.component.scss']
})
export class WorkinprogressComponent implements OnInit {

  pageTitle: string = ' VD/DL Detail';
  Title: string = 'Work In Progress';
  errorMessage: string;
  vddlItems: Array<any> =[];
  pended: boolean = false ;
  isLoaded:boolean = false;

  constructor(private _vddlService: VdDlDataService, private _router: Router, private router: ActivatedRoute, private vddlData: vddlDataProvider) {
    router.snapshot.data[1];
    //router.queryParams.subscribe( (x) => this.pended = x.pended);
    this.pended = router.snapshot.queryParams["pended"];
    if (this.pended == undefined) {
      this.pended = router.snapshot.params["pended"];
    }
    if (this.pended)
      {
        this.Title = "Audit Cases - Pending";
      }
   }

  ngOnInit() {
    if (!this.pended) {
    this._vddlService.getvddls()
      .subscribe(res => {
        if(res != null){
          this.vddlItems = res;          
        }else{
          swal("No Records Found!", "", "info");          
        }
        this.isLoaded = true;        
      },
      error => this.errorMessage = <any>error);
    } else {
      this._vddlService.getpendedvddls()
      .subscribe(res => {
        if(res != null){
          this.vddlItems = res;
          // this.filteredvddlDetails = this.vddlDetails;
        }else{
          swal("No Records Found!", "", "info");
        }      
       },
       error => this.errorMessage = <any>error);
     }    
  }
  // takes you back to vddl screen for editing
  onVddlEdit(vddlDetail) {    
    this.vddlData.vddlStorage =  vddlDetail;
    this._router.navigate(['/editvddl', {view:"workinprogress"}]);
    
  }
  onVddlView(vddlDetail) {
    //  console.log(vddlDetail); Yossi - Please double check this brook
    var caseId = vddlDetail.VddlDetails.CaseId;
    this.vddlData.vddlStorage =  null
    this._router.navigate(['/viewvddl',{view:"auditpending",data:caseId }]);    
  }

}
