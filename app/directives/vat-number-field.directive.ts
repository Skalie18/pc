import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { VatValidationService } from '../shared-services/validations/vat-validation.service';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-vatnumber]',
  host: {
    '(blur)': 'vatNumber($event)'
  }
})
export class VatNumberFieldDirective {

  constructor(private elm: ElementRef, private renderer: Renderer, private _vatNumber: VatValidationService, public model: NgModel) { }

  vatNumber(event) {
    var that = this;
    if (event.target.value != "") {
      if (event.target.value.length < 10) {
        swal("", "The VAT Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
        event.target.value = null;
        that.model.reset();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
        return;
      }


      let vat = event.target.value;
      this._vatNumber.vatNumberValidation(vat).then(null, function () {
        swal("", "The VAT Number you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br><br>- Only numeric digits may be used.", 'error');
        event.target.value = null;
        that.model.reset();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }

      })

    }


  }

}
