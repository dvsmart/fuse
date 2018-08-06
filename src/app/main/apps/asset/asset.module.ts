import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesFormComponent } from './properties-form/properties-form.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertiesService } from './properties.service';
import { Routes } from '../../../../../node_modules/@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
      path     : '**',
      component: AssetComponent,
      resolve  : {
          contacts: PropertiesService
      }
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AssetComponent, PropertiesListComponent, PropertiesFormComponent, SelectedBarComponent, SidebarComponent]
})
export class AssetModule { }
