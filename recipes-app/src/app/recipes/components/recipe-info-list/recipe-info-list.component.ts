import { Component, input } from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";
import { Recipe } from "../../models/recipe.model";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-recipe-info-list',
  standalone: true,
  imports: [MatChipsModule, MatIcon],
  templateUrl: './recipe-info-list.component.html'
})
export class RecipeInfoListComponent {
  public recipe = input.required<Recipe>();
}
