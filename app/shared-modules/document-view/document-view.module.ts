import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { DataTableModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule
    
  ],
  declarations: [DocumentViewerComponent]
})
export class DocumentViewModule { }
