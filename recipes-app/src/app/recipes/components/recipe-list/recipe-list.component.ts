import { Component } from '@angular/core';
import { recipes } from '../../data/recipe.dummy.data';
import { RecipeListItemComponent } from '../recipe-list-item/recipe-list-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeListItemComponent],
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
  protected recipes = recipes;
}
