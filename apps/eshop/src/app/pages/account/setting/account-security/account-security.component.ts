import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, UserService } from '@eshop/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-account-security',
  templateUrl: './account-security.component.html',
})
export class AccountSecurityComponent implements OnInit {
  currentId: string = '';
  errorMessage: string = '';

  form = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._fetchData();
  }

  onSubmit() {
    if (
      this.form.valid &&
      this.form.controls.newPassword.value ==
        this.form.controls.confirmPassword.value
    ) {
      this.service
        .updatePassword(this.currentId, {
          oldPassword: <string>this.formControl.oldPassword.value,
          newPassword: <string>this.formControl.newPassword.value,
        })
        .subscribe(
          () => {
            this.auth.logout();
            this.service.initAppSession();
            this.router.navigate(['/login']);
          },
          (err) => {
            this.errorMessage = err.error.message;
          }
        );
    } else {
      this.form.controls.oldPassword.markAllAsTouched();
      this.form.controls.newPassword.markAllAsTouched();
      this.form.controls.confirmPassword.markAllAsTouched();
    }
  }

  private _fetchData() {
    this.service._currentUser().subscribe((user: any) => {
      if (user) {
        this.currentId = user._id;
      }
    });
  }

  get formControl() {
    return this.form.controls;
  }
}
