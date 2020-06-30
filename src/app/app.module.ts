import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { MusicServiceService } from './music-service.service';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutPageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MusicServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
