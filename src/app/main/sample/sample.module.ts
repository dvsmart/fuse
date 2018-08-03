import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

const routes = [
    {
        path: 'sample',
        //component: SampleComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            children: [
              { path: '', component: SampleComponent }
            ],
          }
        ]
      }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    providers:[AuthGuard,AuthService],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
