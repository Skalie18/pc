import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DataTableModule,
  CalendarModule,
  DialogModule,
  ToolbarModule,
  DropdownModule,
  CheckboxModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import { LoadingbarModule } from 'app/shared-modules/loadingbar/loadingbar-module';
import { SearchComponent } from './search-view/search-view.component';
import { SearchDataService } from './search-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    LoadingbarModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    ToolbarModule,
    CheckboxModule,
    TableModule
  ],
  declarations: [SearchComponent],
  providers: [SearchDataService]
})
export class SearchModule {}
