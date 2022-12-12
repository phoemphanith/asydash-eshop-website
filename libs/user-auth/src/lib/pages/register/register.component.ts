import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isSubmit: boolean = false;
  authError: string = '';
  isLoading: boolean = false;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isSubmit = true;
    this.isLoading = true;
    const isPasswordMatch =
      this.formControl.password.value == this.formControl.confirmPassword.value;

    if (!this.form.valid || !isPasswordMatch) {
      this.isLoading = false;
      return;
    }

    const form = {
      email: this.formControl.email.value,
      password: this.formControl.password.value,
    };

    this.service.onRegister(form).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
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
