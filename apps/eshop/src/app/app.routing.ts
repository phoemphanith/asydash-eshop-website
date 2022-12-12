import { NgModule } from '@angular/core';
import { AuthGuardService as AuthGuard } from '@eshop/user-auth';
import { RouterModule, Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Route[] = [
  { path: '', component: HomepageComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
