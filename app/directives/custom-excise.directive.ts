import { Directive } from '@angular/core';
import { CustomExciseValidationService } from '../shared-services/validations/custom-excise-validation.service';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
@Directive({
  selector: '[sars-customexcise]',

  host: {
    '(blur)': 'customexcise($event)'

  }
})
export class CustomExciseDirective {

  constructor(private customExcise:CustomExciseValidationService, public model:NgModel ) {
    
   }


  customexcise(event) {
    var that = this;
    if(event.target.value != ""){
      if(event.target.value.length < 8 ){
        swal("", "The Custom/Excise Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
        event.target.value = null;
        that.model.reset();
        if(event.target.attributes.required){
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
        return;
      }
  
      // if(event.target.value !=""){
        let custom = event.target.value;
        this.customExcise.validateCustomExciseNumber(custom).then(null, function () {
          swal("", "The Custom/Excise Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
          event.target.value = null;
          that.model.reset();
          if(event.target.attributes.required){
            event.target.className = "form-control ng-pristine ng-invalid ng-touched";
          }
       
        })
  
      // }

    }
    // checking the length of the field

  }

}
