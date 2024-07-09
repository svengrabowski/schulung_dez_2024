import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe.model";
import { toObservable } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, switchMap } from "rxjs";
import { getEmptyRecipe } from "../../mappings/recipe.mapping";
import { RecipeInfoListComponent } from "../recipe-info-list/recipe-info-list.component";
import { RecipeIngredientListComponent } from "../recipe-ingredient-list/recipe-ingredient-list.component";
import { RecipePreparationComponent } from "../recipe-preparation/recipe-preparation.component";
import { Router } from "@angular/router";
import { MatDivider } from "@angular/material/divider";
import { DeleteButtonComponent } from "@shared/exports";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    RecipeInfoListComponent,
    RecipeIngredientListComponent,
    RecipePreparationComponent,
    MatDivider,
    DeleteButtonComponent,
  ],
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  public recipeId = input.required<string>();

  protected recipe: WritableSignal<Recipe> = signal(getEmptyRecipe());

  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  constructor() {
    toObservable(this.recipeId)
      .pipe(
        distinctUntilChanged(),
        switchMap(id => this.recipeService.getRecipe(id)),
      )
      .subscribe(recipe => this.recipe.set(recipe));
  }

  protected deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe())
      .subscribe(res => {
        this.router.navigate(['recipes']);
      });
  }
}
