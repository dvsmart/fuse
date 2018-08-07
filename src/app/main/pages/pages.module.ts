import { NgModule } from '@angular/core';
import { ForgotPassword2Module } from './authentication/forgot-password-2/forgot-password-2.module';
import { ResetPassword2Module } from './authentication/reset-password-2/reset-password-2.module';
import { LockModule } from './authentication/lock/lock.module';
import { Error500Module } from './errors/500/error-500.module';
import { Error404Module } from './errors/404/error-404.module';
import { MailConfirmModule } from './authentication/mail-confirm/mail-confirm.module';

@NgModule({
    imports: [
        // Authentication
        ForgotPassword2Module,
        ResetPassword2Module,

        LockModule,
        MailConfirmModule,

        // Errors
        Error404Module,
        Error500Module,

    ]
})
export class PagesModule
{

}
