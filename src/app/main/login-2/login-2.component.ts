import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../guards/authservice';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
    selector   : 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    returnUrl: string;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authservice: AuthService,
        private router: Router,
        private route: ActivatedRoute
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'apps/dashboards/analytics';
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        if (this.loginForm.invalid) {
          return;
        }
        var isAuthenticated = this.authservice.authenticate(this.loginForm.value);
        if (isAuthenticated) {
          this.router.navigateByUrl(this.returnUrl);
        }
    }
}
