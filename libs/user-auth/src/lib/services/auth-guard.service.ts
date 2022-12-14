import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private local: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const localToken = this.local.getToken();
    if (localToken) {
      const tokenDecode: any = JSON.parse(atob(localToken.split('.')[1]));
      if (this.local.isTokenExpired(+tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    this.local.removeToken();
    return false;
  }
}
