import { Directive, ElementRef ,Renderer, Input} from '@angular/core';
import { IdValidationService } from '../shared-services/validations/id-validation.service';
import swal from 'sweetalert2';

@Directive({
  selector: '[sars-idNumberfield]',
  host: {
    '(blur)': 'idValidation($event)'
  }
})
export class IdNumberFieldDirective {

  constructor(private el:ElementRef,private renderer: Renderer,private _idValidation: IdValidationService) { }

  idValidation(event){
    if(event.target.value !=""){
      this._idValidation.IdNumberValidation(event.target.value).then(null,function(){
        swal("","The ID No. you have entered does not seem to be valid. Please ensure that it is correct.<br><br><b>HINTS:</b><br>- Only numeric digits may be used.",'error');           
        event.target.value =null;
      });

    }
  }
}
