import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from './fuse-config';

import { FakeDbService } from './fake-db/fake-db.service';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SampleModule } from './main/sample/sample.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthGuard } from './main/guards/auth.guard';
import { AuthService } from './main/guards/authservice';
import { Login2Module } from './main/login-2/login-2.module';
import { MessageService } from './shared/services/message.service';

const appRoutes: Routes = [
    {path: '', redirectTo:'apps/dashboards/analytics', pathMatch: 'full'},
    {
        path:'apps',
        canActivate:[AuthGuard],
        loadChildren: './main/apps/apps.module#AppsModule'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        Login2Module,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    providers: [AuthGuard, AuthService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
