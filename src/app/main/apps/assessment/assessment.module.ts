import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentFilterComponent } from './assessment-filter/assessment-filter.component';
import { Routes, RouterModule } from '../../../../../node_modules/@angular/router';
import { AssessmentService } from './assessment.service';
import { SharedModule } from '../../../shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatMenuModule, MatInputModule, MatRippleModule, MatTableModule, MatPaginatorModule, MatToolbarModule } from '../../../../../node_modules/@angular/material';

const routes: Routes = [
  {
    path: '**',
    component: AssessmentComponent,
    resolve:{
      properties: AssessmentService
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
  providers:[AssessmentService],
  declarations: [AssessmentComponent, AssessmentListComponent, AssessmentFormComponent, AssessmentFilterComponent]
})
export class AssessmentModule { }
