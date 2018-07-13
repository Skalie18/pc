import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DocumentUploadComponent } from './document-upload.component';
import {DocumentUploadComponent} from 'app/shared-modules/document-upload/document-upload.component';
import { DataTableModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
        BrowserModule,
        BrowserAnimationsModule,
    
  ],
  exports:[DocumentUploadComponent],
  declarations: [DocumentUploadComponent]
})
export class DocumentUploadModule { }