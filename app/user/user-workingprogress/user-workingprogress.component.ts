import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SarProvider } from 'app/user/sar-provider';
import { Iuser } from '../user-interface';
import swal from 'sweetalert2';
import { ISarInterface } from '../sar-interface';

@Component({
  selector: 'app-user-workingprogress',
  templateUrl: './user-workingprogress.component.html',
  styleUrls: ['./user-workingprogress.component.scss']
})
export class UserWorkingprogressComponent implements OnInit {

  whichRoleActive:String;
  isLoaded: boolean = false;
  constructor(private _sarsServics: UserService ,private _router: Router,private sarData:SarProvider , private router: ActivatedRoute ) {
    
    this.whichRoleActive = router.snapshot.params["link"];

   }

  cpageTitle: string = ' SAR Detail';
  errorMessage: string;
  filteredsarDetails:Array<any> = [];
  sarDetails:Array<any> = [];


  ngOnInit(){
  
    this._sarsServics.getSars()
      .subscribe(res => {
       
        if(res != null){
          this.sarDetails = res;
    
        }else {
          swal("No Records Found!", "", "info");
        }
        this.isLoaded = true;
      },
      error => this.errorMessage = <any>error);
      
  }
  // takes you back to sar screen for editing
  onSarEdit(sarDetails) {
    //  console.log(vddlDetail); quilityassuer
    this.sarData.sarStorage = sarDetails;

    if(this.whichRoleActive == "SarAlocatedCases"){

      this._router.navigate(['/editsar',{view:"allocateView", role:this.whichRoleActive }]);

    }else if(this.whichRoleActive == "SarReviewer"){
        
      this._router.navigate(['/editsar',{view:"sarReviewer", role:this.whichRoleActive }]);
    }  
    else{
      this._router.navigate(['/editsar']);
    }
    
  }


}
