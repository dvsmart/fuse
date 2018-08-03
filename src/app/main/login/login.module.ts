import { NgModule } from "../../../../node_modules/@angular/core";
import { LoginComponent } from "./login.component";
import { RouterModule } from "../../../../node_modules/@angular/router";
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
    {
        path     : 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule
    ]
})
export class LoginModule
{
}