import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightGuardGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    return this.checkStep(url);
  }

  checkStep(url): Promise<boolean | UrlTree> | boolean {
    let result: boolean;
    switch (url) {
      case '/flight/confirm':
        result = this.router.navigated;
        if (!result) {
          return this.router.navigate(['/flight/schedule']);
        }
    }
    return result;
  }
}
