import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './_rest/auth.service';

@Injectable()
export class SectionGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,)
  { }

  canActivate(route: ActivatedRouteSnapshot): boolean {    
    let user = this.authService.userData.getValue();
    let page = route.data["section"] as number;

    if(user && user.getPermissions() && user.getPermissions().includes(page)) {    
        return true;
    } else {
        this.router.navigate(['/']);
    }
  }
}