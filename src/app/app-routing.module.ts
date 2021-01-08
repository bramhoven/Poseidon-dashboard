import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateServerPageComponent } from './components/create-server-page/create-server-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ServerOverviewComponent } from './components/server-overview/server-overview.component';
import { ServerComponent } from './components/server/server.component';



const routes: Routes = [
  {
    path: 'servers',
    children: [
      {
        path: ':serverId',
        component: ServerComponent
      },
      {
        path: '',
        component: ServerOverviewComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: 'create', component: CreateServerPageComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
