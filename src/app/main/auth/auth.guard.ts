import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authService.isLoggedIn()) {
            debugger;
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authService.isLoggedIn()) {
            debugger;
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
