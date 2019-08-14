import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { RecipeService } from "src/app/services/recipe.service";

@Component({
  selector: "app-recipe-overview",
  templateUrl: "./recipe-overview.component.html",
  styleUrls: ["./recipe-overview.component.scss"]
})
export class RecipeOverviewComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "calories",
    "carbs",
    "protein",
    "fats",
    "externalSource",
    "delete"
  ];
  public recipes: any;

  constructor(
    private recipeService: RecipeService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.getUser().subscribe(user => {
      const recipeIds = user.user.recipes;
      console.log(recipeIds);
      this.getAllRecipes(recipeIds);
    });
  }

  public getAllRecipes(recipeIds): void {
    this.recipeService.getRecipes(recipeIds).subscribe(recipes => {
      this.recipes = recipes.recipe;
      console.log(this.recipes);
    });
  }

  public deleteRecipe(recipe) {
    this.recipeService.deleteRecipe(recipe._id).subscribe(res => {
      console.log(res);
    });
  }
}
