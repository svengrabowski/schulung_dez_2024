import { Component, input } from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";
import { Recipe } from "../../models/recipe.model";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-recipe-chips-list',
  standalone: true,
  imports: [MatChipsModule, MatIcon],
  templateUrl: './recipe-chips-list.component.html'
})
export class RecipeChipsListComponent {
  public recipe = input.required<Recipe>();
}
