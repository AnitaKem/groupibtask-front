import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_rest/auth.service';
import { MiscService } from '../_rest/misc.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public username: string;
  
  public isSection1Available: boolean = false;
  public isSection2Available: boolean = false;
  public isSection3Available: boolean = false;
  public isSectionAdminAvailable: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.authorizationData.subscribe(val => {
      this.isLoggedIn = !!val;
    });
    this.authService.userData.subscribe( (user: User) => {   
        
      if(user){
        this.isSection1Available = user.getPermissions().includes(MiscService.Sections.section1);
        this.isSection2Available = user.getPermissions().includes(MiscService.Sections.section2);
        this.isSection3Available = user.getPermissions().includes(MiscService.Sections.section3);
        this.isSectionAdminAvailable = user.getPermissions().includes(MiscService.Sections.admin);
        this.username = user.name;
      } else {
        this.isSection1Available = false;
        this.isSection2Available = false;
        this.isSection3Available = false;
        this.isSectionAdminAvailable = false;
        this.username = null;
      }
    });
  }

  public logout(): void{
    this.authService.authorizationData.next(null);
    this.authService.userData.next(null);
    this.router.navigate(['/'], { skipLocationChange: false });
  }

}