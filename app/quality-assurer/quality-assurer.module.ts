import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuilityAssurerComponent } from './quility-assurer/quility-assurer.component';
import { QuilityAssurerService } from './quility-assurer.service';
import { DataTableModule } from 'primeng/primeng';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    LoadingbarModule
  ],
  declarations: [QuilityAssurerComponent],
  providers:[QuilityAssurerService]
})
export class QualityAssurerModule { }
