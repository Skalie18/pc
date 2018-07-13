import { Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-alphanumeric]',
  host: {
    '(keypress)': 'AlphaNumeric($event)',
    '(keyup)': 'AlphaNumeric($event)',
    '(mouseleave)': 'AlphaNumeric($event)'

  }

})
export class AlphaNumericDirective {

  constructor(public model: NgModel) { }


  AlphaNumeric(event) {

    var that = this;
    let reg = "^[a-zA-Z0-9]+$";
    let regtest = new RegExp(reg);
    if (!regtest.test(event.target.value)) {
      event.target.value = null;
      that.model.reset();
      if (event.target.attributes.required) {
        event.target.className = "form-control ng-pristine ng-invalid ng-touched";
      }
    }

  }

}