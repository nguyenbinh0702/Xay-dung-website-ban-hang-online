import { exception } from './../shared/exceptions/exceptions';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Created by: Quân
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const currentAccount = this.tokenStorageService.getJwtResponse();

    if (currentAccount) {
      const expectedRole = route.data.expectedRole
      const roleAuthorities = this.tokenStorageService.getJwtResponse().authorities[0].authority
      if (roleAuthorities == expectedRole) {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
