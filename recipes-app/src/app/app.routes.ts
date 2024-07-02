import { Routes } from '@angular/router';
import { RecipeListComponent, RecipeDetailComponent, RecipeFormComponent } from "@recipe/exports";

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
    path: 'recipes/new',
    component: RecipeFormComponent,
    title: 'New Recipe',
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeDetailComponent,
    title: 'Recipe Detail',
  }
];
