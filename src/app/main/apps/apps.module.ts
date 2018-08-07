import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes: Routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path        : 'asset',
        loadChildren: './asset/asset.module#AssetModule'
    },
    {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule'
    },
    {
        path: 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule {
}
