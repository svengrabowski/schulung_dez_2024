import { Routes } from '@angular/router';
import { RecipeListComponent, RecipeDetailComponent } from "@recipe/exports";

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
