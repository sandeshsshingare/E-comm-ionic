import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { HomeService } from "../home/service/home.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  authService = inject(HomeService);
  router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService
      .isCustomerLogin()
      .then((data) => {
        return data;
      })
      .catch((data) => {
        this.router.navigate(["/auth/login"]);
        return data;
      });
  }
}
