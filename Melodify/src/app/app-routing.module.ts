import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'
import {AboutPageComponent} from './about-page/about-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "about", component: AboutPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
