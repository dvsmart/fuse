import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { Login2Component } from 'app/main/pages/authentication/login-2/login-2.component';

const routes = [
    {
        path     : 'login-2',
        component: Login2Component
    }
];

@NgModule({
    declarations: [
        Login2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ],
    exports:[Login2Component]
})
export class Login2Module
{
}
