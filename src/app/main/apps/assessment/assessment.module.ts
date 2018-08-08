import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentFilterComponent } from './assessment-filter/assessment-filter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AssessmentComponent, AssessmentListComponent, AssessmentFormComponent, AssessmentFilterComponent]
})
export class AssessmentModule { }
