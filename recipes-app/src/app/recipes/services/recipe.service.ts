import { Injectable } from '@angular/core';
import { recipes } from '../data/recipe.dummy.data';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = recipes;

  public getAllRecipes(): Recipe[] {
    return this.recipes;
  }
}
