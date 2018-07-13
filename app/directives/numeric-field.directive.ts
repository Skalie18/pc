import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-numericfield]',
  host: {
    '(keyup)': 'numnerOnly($event)',
    '(keypress)': 'numnerOnly($event)',
    '(change)': 'numnerOnly($event)'

  }
})
export class NumericFieldDirective {

  constructor(private el: ElementRef, private renderer: Renderer ,public model:NgModel) { }


  numnerOnly(event) {

    var that = this;
    let regtest = new RegExp("^[0-9]*$");

    // this.renderer.
    //
    if (event.target.value != "") {
      if (!regtest.test(event.target.value)) {

        event.target.value = null;
        that.model.reset();
        event.preventDefault();
        if (event.target.attributes.required) {
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }

      }

    }
  }

}
