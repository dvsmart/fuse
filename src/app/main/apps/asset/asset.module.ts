import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesService } from './properties.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FuseSidebarModule, FuseConfirmDialogModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';

const routes: Routes = [
  {
    path: '**',
    component: AssetComponent,
    resolve:{
      properties: PropertiesService
    }
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,

    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  providers:[PropertiesService],
  declarations: [AssetComponent, PropertiesListComponent, PropertiesFormComponent, SelectedBarComponent, SidebarComponent],
  entryComponents:[PropertiesFormComponent]
})
export class AssetModule { }
