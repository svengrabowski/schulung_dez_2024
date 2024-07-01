import { Routes } from '@angular/router';
import { RecipeListComponent } from "@recipe/exports";
import { RecipeDetailComponent } from "./recipes/components/recipe-detail/recipe-detail.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipeListComponent,
    title: 'Recipe List',
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeDetailComponent,
    title: 'Recipe Detail',
  }
];
