import { Component } from '@angular/core';
import { recipes } from '../../data/recipe.dummy.data';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatGridListModule],
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
  protected recipes = recipes;
}
