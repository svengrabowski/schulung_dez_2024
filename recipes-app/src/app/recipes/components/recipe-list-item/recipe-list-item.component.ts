import { Component, input } from '@angular/core';
import { Recipe } from '../../model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-recipe-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatGridListModule],
  templateUrl: './recipe-list-item.component.html'
})
export class RecipeListItemComponent {
  public recipe = input.required<Recipe>();
}
