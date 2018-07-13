import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { IncometaxValidationService } from '../shared-services/validations/incometax-validation.service';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[sars-taxincome]',
  host: {
    '(blur)': 'taxIncomeNumber($event)'
  }
})
export class TaxincomeNumberFieldDirective {

  constructor(private elm: ElementRef, private renderer: Renderer, private _taxIncome: IncometaxValidationService, public model: NgModel) {
    this.renderer.setElementAttribute
  }


  taxIncomeNumber(event) {
    var that = this;
    if (event.target.value != "") {
      if (event.target.value.length < 10) {
        swal("", "The Tax Income Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
        event.target.value = null;
        that.model.reset();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
        return;
      }



      let incomeNumber = event.target.value;

      this._taxIncome.incomeNumberValidator(incomeNumber).then(null, function () {
        swal("", "The Tax Income Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
        event.target.value = null;
        that.model.reset();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }

      });
    }
  }

}

