import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Route[] = [{ path: '', component: HomepageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
