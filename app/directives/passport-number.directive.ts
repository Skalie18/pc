import { Directive } from '@angular/core';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-passportnumber]',

  host: {
    '(blur)': 'passportValidation($event)',
    '(change)': 'passportValidation($event)'

  }
})
export class PassportNumberDirective {

  constructor(public model: NgModel) { }

  passportValidation(event) {

    var that = this;
    if (event.target.value != "") {
      if (!this.checkNumber(event.target.value )) {
        event.target.value = null;
        that.model.reset();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
        swal("", "The Passport you have entered does not seem to be valid. Please ensure that it is correct. <br><br><b>HINTS:</b><br>- Only alphanumeric digits may be used<br> At least 8 digits must be completed", 'error');

      }
    }
  }


  private checkNumber(value): boolean {

    let len = value.length;
    var count = 0;
    for (let i = 0; i < len; i++) {
      if (!isNaN(value[i])) {
        count++;
      }
    }
    if (count < 8) {
      return false;
    }else{
      return true;
    }

  }
}
