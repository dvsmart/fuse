import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    DataTableComponent,
    SidebarComponent
  ],
  declarations: [DataTableComponent, SidebarComponent]
})
export class SharedModule { }
