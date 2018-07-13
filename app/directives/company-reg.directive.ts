import { Directive, ElementRef ,Renderer, Input} from '@angular/core';
import { CompanyRegValidationService } from '../shared-services/validations/company-reg-validation.service';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[sars-companyreg]',
  host: {
    '(blur)': 'companyReg($event)'
  }
})
export class CompanyRegDirective { 
  constructor(private el:ElementRef,private renderer: Renderer, private _companyRege:CompanyRegValidationService , public model:NgModel) { 
     this.el.nativeElement
   
  }


  companyReg(event){  
    
    var that = this;

    if(event.target.value!= ""){
     
      let  registeredNo = event.target.value
      this._companyRege.validateCompanyRegNo(registeredNo)
        .then(null,function(){
            swal("","The Company Reg No. you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Please ensure that it is in the following format - CCYY/NNNNNN/NN<br>- The last two digits of the number must be either of the following:<br> 06,07,08,09,10,11,20,21,22,23,24,25,26 .",'error');           
            event.target.value =null; 
            that.model.reset();                 
            if(event.target.attributes.required){
              event.target.className = "form-control ng-pristine ng-invalid ng-touched";
            }        
        // this.renderer.this.this.el.nativeElement 
      });
    }
  }
}
