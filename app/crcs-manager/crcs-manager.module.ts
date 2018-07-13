import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaApprovalComponent } from './ra-approval/ra-approval.component';
import { RaApprovalRejectionComponent } from './ra-approval-rejection/ra-approval-rejection.component';
import { RaApprovalScreenComponent } from './ra-approval-screen/ra-approval-screen.component';
import { SarAllocationComponent } from './sar-allocation/sar-allocation.component';
import { SarAllocationService } from './sar-allocation.service';
import {DataTableModule} from 'primeng/primeng';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    LoadingbarModule
  ],
  declarations: [RaApprovalComponent, RaApprovalRejectionComponent, RaApprovalScreenComponent, SarAllocationComponent],
  providers: [SarAllocationService]
})
export class CrcsManagerModule { }
