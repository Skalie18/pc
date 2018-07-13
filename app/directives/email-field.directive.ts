import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
@Directive({
  selector: '[sars-emailfield]',
  host: {
    '(blur)': 'checkingEmail($event)',
  }
})
export class EmailFieldDirective {

  constructor(private el: ElementRef, private renderer: Renderer, public model:NgModel) { }

  checkingEmail(event) {
    
    var that = this;
    let regtest  = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

    if(!regtest.test(event.target.value)){
      //event.event.preventDefault();
      if(event.target.value != ""){
        swal("","The Email you have entered does not seem to be valid. Please ensure that it is correct. <br><br><b>HINTS:</b><br>- Ensure that it has an @ sign and a .domain at the end.",'error');
        event.target.value =  null;
        that.model.reset();
        if(event.target.attributes.required){
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
        // this.renderer
      }
    }

  }
}
