import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DotsAndSquaresComponent } from './projects/dots-and-squares/dots-and-squares.component';
import { ProjectsComponent } from './projects/projects.component';
import { FoodComponent } from './food/food.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    DotsAndSquaresComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    FoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
