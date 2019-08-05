import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'food', component: FoodComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '*', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
