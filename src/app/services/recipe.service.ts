import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  public uri = "http://localhost:8080";

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getRecipe(id: string) {
    const token = this.cookieService.get("bearer");
    return this.http.get<any>(`${this.uri}/recipe/${id}`, {
      headers: new HttpHeaders({ Authorization: `bearer ${token}` })
    });
  }

  public getRecipes(recipeIds: string[]) {
    const body = {
      recipeIds
    };
    const token = this.cookieService.get("bearer");
    return this.http.post<any>(`${this.uri}/recipe/all`, body, {
      headers: new HttpHeaders({ Authorization: `bearer ${token}` })
    });
  }

  public addRecipe(recipeForm) {
    const token = this.cookieService.get("bearer");
    const body = {
      email: this.cookieService.get('username'),
      name: recipeForm.name,
      externalSource: recipeForm.externalSource,
      calories: recipeForm.calories,
      carbs: recipeForm.carbs,
      protein: recipeForm.protein,
      fats: recipeForm.fats
    };

    console.log('this is the body snet to backend', body);

    return this.http.post<any>(`${this.uri}/recipe/add`, body, {
      headers: new HttpHeaders({ Authorization: `bearer ${token}` })
    }).pipe(map(result => {
      return result;
    }, error => {
      return error;
    }));
  }

  public deleteRecipe(recipeId: string) {
    console.log('id received', recipeId);
    const token = this.cookieService.get('bearer');
    return this.http.delete<any>(`${this.uri}/recipe/${recipeId}`, {
      headers: new HttpHeaders({ Authorization: `bearer ${token}` })
    }).pipe(map(result => {
      return result;
    }, error => {
      return error;
    }));
  }
}
