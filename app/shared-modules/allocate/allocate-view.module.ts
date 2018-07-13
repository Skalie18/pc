import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocateViewComponent } from './allocate-view/allocate-view.component';
import { AllocateViewService } from './allocate-view.service';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [AllocateViewComponent],
  exports : [AllocateViewComponent],
  providers: [AllocateViewService]  
})

export class AllocateViewModule { }
