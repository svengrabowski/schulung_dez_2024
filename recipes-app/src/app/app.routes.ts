import { Routes } from '@angular/router';
import { RecipeListComponent, RecipeDetailComponent } from "@recipe/exports";
import { RecipeFormComponent } from "./recipes/components/recipe-form/recipe-form.component";

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
