import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { UserService } from '../../services/user.service';
import { UsersEffects } from '../../state/users.effects';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSubmit: boolean = false;
  authError: string = '';
  isLoading: boolean = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private local: LocalStorageService,
    private userService: UserService
  ) {}

  onSubmit() {
    this.isSubmit = true;
    this.isLoading = true;
    if (!this.form.valid) {
      this.isLoading = false;
      return;
    }
    const form = {
      email: this.formControl.email.value,
      password: this.formControl.password.value,
    };
    this.service.onLogin(form).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/']);
        this.local.setToken(res.result.token);
        this.userService.initAppSession();
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 400) {
          this.authError = error.error.message;
        } else {
          this.authError = 'Serve is not response';
        }
      }
    );
  }

  get formControl() {
    return this.form.controls;
  }
}
