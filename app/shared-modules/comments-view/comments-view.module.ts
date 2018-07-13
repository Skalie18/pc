import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsViewComponent } from './comments-view/comments-view.component';
import { CommentsViewDataService } from './comments-view-data.service';
import {DataTableModule, CalendarModule,ButtonModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule
  ],
  declarations: [CommentsViewComponent],
  exports : [CommentsViewComponent],
  providers: [CommentsViewDataService]  
})

export class CommentsViewModule { }
