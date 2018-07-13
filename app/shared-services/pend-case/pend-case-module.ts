import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendCaseService } from "app/shared-services/pend-case/pend-case.service";




@NgModule({
  imports: [
    CommonModule
  ],
  providers: [PendCaseService]  
})
export class PendCaseModule { }