import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-limitfield]',
  host: {
    '(keypress)': 'checkFieldLength($event)',
    '(keyup)': 'checkFieldLength($event)',
    '(mouseleave)': 'checkFieldLength($event)',
    '(change)': 'checkFieldLength($event)'
  
  }
})
export class LimitFieldDirective {

  @Input('sars-limitfield') value: number;
  constructor(private el: ElementRef, private renderer: Renderer, public model:NgModel) {
    // renderer.setElementStyle(el.nativeElement, 'display', 'none');
  }

  checkFieldLength(event) {
    var that = this;
    if (event.target.value != "") {

      if (event.target.value.length == Number(this.value)) {
        event.preventDefault();
      }

      if(event.target.value.length > Number(this.value)){
        event.target.value = null;
        that.model.reset();
        if(event.target.attributes.required){
          event.target.className = "form-control ng-pristine ng-invalid ng-touched";
        }
      }
    }

  }


}
