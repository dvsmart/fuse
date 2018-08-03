import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

const routes: Routes = [
    {
        path: 'apps',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    providers: [AuthGuard, AuthService]
})
export class AppsModule {
}
