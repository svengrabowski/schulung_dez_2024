import { Injectable, inject } from '@angular/core';
import { Recipe, RecipeDto } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { mapRecipeDtoArrayToRecipeArray } from '../util/recipe.mapping';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly httpClient = inject(HttpClient);

  public getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<RecipeDto[]>('http://localhost:3000/recipes').pipe(
      map(mapRecipeDtoArrayToRecipeArray),
    );
  }
}
