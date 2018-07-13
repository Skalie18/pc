import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientInterfaceComponent } from './client-interface/client-interface.component';
import { WorkinprogressComponent } from './workinprogress/workinprogress.component';
import { VdDlDataService } from 'app/client-interface/vd-dl-data.service';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { PendCaseModule } from "app/shared-services/pend-case/pend-case-module";
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import {DataTableModule, PanelModule} from 'primeng/primeng';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
import { Globals } from '../globals';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule,
    PendCaseModule,
    SharedDirectivesModule,
    DataTableModule,
    PanelModule,
    LoadingbarModule
  ],
  declarations: [ClientInterfaceComponent, WorkinprogressComponent ],
  providers:[VdDlDataService,vddlDataProvider, Globals]
})
export class ClientInterfaceModule { }
