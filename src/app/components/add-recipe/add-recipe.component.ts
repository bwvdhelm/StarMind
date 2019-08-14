import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  public recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: [''],
      externalSource: [''],
      calories: [''],
      carbs: [''],
      protein: [''],
      fats: ['']
    })
  }

  public addRecipe() {
    console.log('Sending over this value to the service', this.recipeForm.value);
    this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
      console.log(result);
    });
  }

}
