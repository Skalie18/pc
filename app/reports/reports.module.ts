import {NgModule}from '@angular/core';
import {CommonModule}from'@angular/common';
import {ReportsViewComponent}from'./reports-view/reports-view.component';
import { DataTableModule } from 'primeng/primeng';
import { DropdownModule } from'primeng/primeng';
import {ButtonModule} from'primeng/components/button/button';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from'primeng/components/calendar/calendar';
import {FieldsetModule} from 'primeng/components/fieldset/fieldset';
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import {DialogModule} from 'primeng/components/dialog/dialog';


@NgModule({

  imports: [
    CommonModule,
    DataTableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    FieldsetModule,
    MenubarModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,

  ],

  declarations: [ReportsViewComponent]

})

export
  class ReportsModule { }
