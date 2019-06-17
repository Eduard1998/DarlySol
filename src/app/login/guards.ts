import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AboutGuard implements CanActivate{
    constructor(private router: Router) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(localStorage.getItem('user')) {
            return true;
        } else {
            this.router.navigate(['/login-user']);
            return false;
        }
    }
}