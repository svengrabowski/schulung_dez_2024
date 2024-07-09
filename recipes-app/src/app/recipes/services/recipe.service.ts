import { Injectable, inject } from '@angular/core';
import { Recipe, RecipeDto } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { mapRecipeDtoArrayToRecipeArray, mapRecipeDtoToRecipe, mapRecipeToRecipeDto } from '../mappings/recipe.mapping';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly baseUrl = 'http://localhost:3000/';
  private readonly httpClient = inject(HttpClient);

  public getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<RecipeDto[]>(`${this.baseUrl}recipes`).pipe(
      map(mapRecipeDtoArrayToRecipeArray),
    );
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.httpClient.get<RecipeDto>(`${this.baseUrl}recipes/${id}`).pipe(
      map(mapRecipeDtoToRecipe),
    );
  }

  public addNewRecipe(recipe: Recipe): Observable<Recipe> {
    const recipeDto = mapRecipeToRecipeDto(recipe)
    return this.httpClient.post<RecipeDto>(`${this.baseUrl}recipes`, recipeDto).pipe(
      map(mapRecipeDtoToRecipe),
    );
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    const recipeDto = mapRecipeToRecipeDto(recipe);
    return this.httpClient.put<RecipeDto>(`${this.baseUrl}recipes/${recipeDto.id}`, recipeDto).pipe(
      map(mapRecipeDtoToRecipe),
    );
  }

  public deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.delete<RecipeDto>(`${this.baseUrl}recipes/${recipe.id}`).pipe(
      map(mapRecipeDtoToRecipe),
    );
  }
}
