import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../model";
import { toObservable } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, switchMap } from "rxjs";
import { getEmptyRecipe } from "../../util/recipe.mapping";
import { RecipeChipsListComponent } from "../recipe-chips-list/recipe-chips-list.component";
import { RecipeIngridientListComponent } from "../recipe-ingridient-list/recipe-ingridient-list.component";
import { RecipePreparationComponent } from "../recipe-preparation/recipe-preparation.component";
import { Router, RouterLink } from "@angular/router";
import { MatDivider } from "@angular/material/divider";
import { DeleteButtonComponent } from "@shared/exports";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    RecipeChipsListComponent,
    RecipeIngridientListComponent,
    RecipePreparationComponent,
    MatDivider,
    DeleteButtonComponent,
    RouterLink,
    MatIcon,
    MatButton,
    MatAnchor
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
    this.recipeService.deleteRecipe(this.recipe()).subscribe(() => {
      this.router.navigate(['recipes']);
    });
  }
}
