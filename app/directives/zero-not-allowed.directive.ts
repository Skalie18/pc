import { Directive } from '@angular/core';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[sars-zeronotallowed]',
  host: {
    '(blur)': 'zeroNotAllowed($event)'
  }
})
export class ZeroNotAllowedDirective {

  constructor(public model:NgModel) { }

  zeroNotAllowed(event){
    var that = this;
    if( Number(event.target.value) === 0 ){
      swal("", "Zero is not Allowed", 'error');
      event.target.value = null;
      that.model.reset();
      if(event.target.attributes.required){
        event.target.className = "form-control ng-pristine ng-invalid ng-touched";
      }
      return;
    }
  }
}
