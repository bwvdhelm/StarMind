import { Component, OnInit } from "@angular/core";

export interface IWeek {
  days: IDay[];
  macros: IMacros;
}

export interface IDay {
  name: string;
  recipes?: IRecipe[];
  macros: IMacros;
}

export interface IRecipe {
  title: string;
  externalLink?: string;
  macros?: IMacros;
}

export interface IMacros {
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

@Component({
  selector: "sm-mealplanner",
  templateUrl: "./mealplanner.component.html",
  styleUrls: ["./mealplanner.component.scss"]
})
export class MealplannerComponent implements OnInit {
  public panelOpenState = false;
  public recipe: IRecipe = {
    title: "granola",
    macros: {
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10
    }
  };
  public week: IWeek = {
    days: [
      {
        name: "Monday",
        recipes: [
          {
            title: "granola",
            macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
          },
          {
            title: "granola",
            macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
          },
          {
            title: "granola",
            macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
          },
          {
            title: "granola",
            macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
          }
        ],
        macros: {
          calories: 10,
          protein: 10,
          carbs: 10,
          fats: 10
        }
      },
      {
        name: "Tuesday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      },
      {
        name: "Wednesday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      },
      {
        name: "Thursday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      },
      {
        name: "Friday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      },
      {
        name: "Saturday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      },
      {
        name: "Sunday",
        recipes: [],
        macros: {
              calories: 10,
              protein: 10,
              carbs: 10,
              fats: 10
            }
      }
    ],
    macros: {
      calories: 10,
      protein: 10,
      carbs: 10,
      fats: 10
    }
  };

  constructor() {}

  ngOnInit() {}

  public removeRecipe(day: number, recipe): void {
    this.week.days[day].recipes = this.week.days[day].recipes.filter(item => {
      return item !== recipe;
    });
    this.updateMacros(day);
  }

  public addRecipe(day: number): void {
    this.week.days[day].recipes.push(this.recipe);
    this.updateMacros(day);
  }

  public updateMacros(day: number) {
    const macros: IMacros = this.week.days[day].recipes.reduce(
      (acc, curr) => {
        return {
          calories: acc.calories + curr.macros.calories,
          carbs: acc.carbs + curr.macros.carbs,
          protein: acc.protein + curr.macros.protein,
          fats: acc.fats + curr.macros.fats
        };
      },
      { calories: 0, carbs: 0, protein: 0, fats: 0 }
    );

    this.week.days[day].macros = macros;
  }
}
