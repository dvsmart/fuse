import { Component, OnInit } from "../../../../node_modules/@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { FormGroup, FormBuilder, Validators } from "../../../../node_modules/@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { AuthService } from "../auth/auth.service";
import { Router, ActivatedRoute } from "../../../../node_modules/@angular/router";

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    returnUrl: string;
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authservice:AuthService,
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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps';
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
          //return true;
        }
      }
}
