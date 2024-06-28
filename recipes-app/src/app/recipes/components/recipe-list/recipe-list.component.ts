import { Component, inject } from '@angular/core';
import { RecipeListItemComponent } from '../recipe-list-item/recipe-list-item.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeListItemComponent],
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
  protected recipes = inject(RecipeService).getAllRecipes();
}
