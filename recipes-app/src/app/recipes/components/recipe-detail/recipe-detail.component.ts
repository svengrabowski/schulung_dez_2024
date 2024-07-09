import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../model";
import { toObservable } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, switchMap } from "rxjs";
import { getEmptyRecipe } from "../../util/recipe.mapping";
import { RecipeChipsListComponent } from "../recipe-chips-list/recipe-chips-list.component";
import { RecipeIngredientListComponent } from "../recipe-ingredient-list/recipe-ingredient-list.component";
import { RecipePreparationComponent } from "../recipe-preparation/recipe-preparation.component";
import { Router } from "@angular/router";
import { MatDivider } from "@angular/material/divider";
import { DeleteButtonComponent } from "@shared/exports";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    RecipeChipsListComponent,
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
