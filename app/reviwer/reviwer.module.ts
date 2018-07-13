import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewerWorkinComponent } from './reviewer-workin/reviewer-workin.component';
import { ReviewerServiceService } from './reviewer-service.service';
import { DataTableModule } from 'primeng/primeng';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    LoadingbarModule
  ],
  declarations: [ReviewerWorkinComponent],
  providers:[ReviewerServiceService]
})
export class ReviwerModule { }
