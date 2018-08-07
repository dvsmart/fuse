import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DatatableComponent } from './components/data-table/data-table.component';
import { MatProgressSpinnerModule, MatIconModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormatCellPipe } from '@fuse/pipes/format-cell.pipe';
import { MessageService } from './services/message.service';
@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    CdkTableModule,
    MatSortModule,
    FuseSharedModule,
    MatPaginatorModule,
  ],
  exports:[
    SidebarComponent,
    DatatableComponent,
  ],
  providers:[MessageService,CurrencyPipe,DatePipe],
  declarations: [DatatableComponent, SidebarComponent,FormatCellPipe]
})
export class SharedModule { }
