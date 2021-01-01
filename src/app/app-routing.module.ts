import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ServerOverviewComponent } from './components/server-overview/server-overview.component';



const routes: Routes = [
  { path: 'servers', component: ServerOverviewComponent },
  { path: '', pathMatch: 'full', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
