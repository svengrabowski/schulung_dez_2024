import { Routes } from '@angular/router';
import { RecipeListComponent } from "@recipe/exports";
import { RecipeDetailComponent } from "./recipes/components/recipe-detail/recipe-detail.component";
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
    path: 'recipes/edit/:recipeId',
    component: RecipeFormComponent,
    title: 'Edit Recipe',
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeDetailComponent,
    title: 'Recipe Detail',
  }
];
