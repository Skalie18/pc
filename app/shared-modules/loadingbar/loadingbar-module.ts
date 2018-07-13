import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/primeng';
import { LoadingbarComponent} from './loadingbar.component';
import {BlockUIModule} from 'primeng/blockui';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule,
    BlockUIModule
  ],
  exports:[LoadingbarComponent],
  declarations: [LoadingbarComponent]
})
export class LoadingbarModule { }