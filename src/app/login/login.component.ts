import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_rest/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required
      ])
    });
  }

  login() {
    this.authService.loginByCredentials(this.loginForm.value.emailFormControl, this.loginForm.value.passwordFormControl)
    .subscribe(
      response => {
        this.router.navigate(['/'], { skipLocationChange: false });
      },
      error => {
        if (error) {
          this.loginForm.setErrors({
            'incorrectPassword': true
          });
        }
    });
  }

}
