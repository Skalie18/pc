import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { FormsModule } from '@angular/forms';
import { DatePicker } from './datepicker.component';


@NgModule({
  imports: [CommonModule,FormsModule],
  declarations: [DatePicker, ClickOutsideDirective],
  exports: [DatePicker,FormsModule, ClickOutsideDirective]
})
export class DatetimepickerModule { }
