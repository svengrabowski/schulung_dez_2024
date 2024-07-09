import { Component, input } from '@angular/core';
import { Ingredient } from "../../models/recipe.model";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-recipe-ingredient-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './recipe-ingredient-list.component.html'
})
export class RecipeIngredientListComponent {
  public servings = input.required<number>();
  public ingredients = input.required<Ingredient[]>();
}
