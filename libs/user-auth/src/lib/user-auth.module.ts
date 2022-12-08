import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import * as userReducer from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

const routes: Route[] = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(userReducer.USER_FEATURE_KEY, userReducer.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [LoginComponent],
  providers: [UsersFacade],
})
export class UserAuthModule {}
