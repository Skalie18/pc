import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashboardDataService } from './dashboard-service.service';
import {ChartModule} from 'primeng/chart';
import { DialogModule } from 'primeng/primeng'; 

import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChartModule, 
    DialogModule,
    LoadingbarModule,
    FormsModule 
  ],
  declarations: [DashBoardComponent],
  providers: [DashboardDataService]
})
export class DashBoardModule { }
