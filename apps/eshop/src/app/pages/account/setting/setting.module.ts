import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'account-info', pathMatch: 'full' },
      { path: 'account-info', component: AccountInfoComponent },
      { path: 'account-security', component: AccountSecurityComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToolbarModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    ToastModule,
  ],
  declarations: [
    LayoutComponent,
    AccountInfoComponent,
    AccountSecurityComponent,
  ],
  exports: [],
  providers: [MessageService],
})
export class SettingModule {}
