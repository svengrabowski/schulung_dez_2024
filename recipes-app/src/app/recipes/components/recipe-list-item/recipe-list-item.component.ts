import { Component, input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-recipe-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatGridListModule, DatePipe, RouterLink],
  templateUrl: './recipe-list-item.component.html'
})
export class RecipeListItemComponent {
  public recipe = input.required<Recipe>();
}
