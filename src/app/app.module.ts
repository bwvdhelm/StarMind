import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatInputModule, MatTabsModule, MatTableModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MealplannerComponent } from './components/mealplanner/mealplanner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeOverviewComponent } from './components/recipe-overview/recipe-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    PageNotFoundComponent,
    MealplannerComponent,
    LoginComponent,
    ProfileComponent,
    AddRecipeComponent,
    RecipeOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    ClickOutsideModule,
    MatExpansionModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule

  ],
  providers: [
    CookieService,
    HttpClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ],

})
export class AppModule { }
