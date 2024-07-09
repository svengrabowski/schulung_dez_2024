import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  Difficulty,
  IngredientForm,
  PortionUnits,
  Recipe,
  RecipeForm,
  TimeUnit
} from "../../models/recipe.model";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { RecipeService } from "../../services/recipe.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Router } from "@angular/router";
import { difficultyOptions, portionUnitOptions, timeUnitOptions } from "../../util/recipe.options";
import { FormErrorComponent } from "@shared/exports";

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatError,
    FormErrorComponent,
    MatOption,
    MatSelect,
    MatIcon,
    CdkTextareaAutosize,
    MatIconButton,
  ],
  templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent {
  protected recipeForm: FormGroup<RecipeForm>;
  protected timeUnitOptions = timeUnitOptions
  protected difficultyOptions = difficultyOptions
  protected portionUnitOptions = portionUnitOptions;

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  constructor() {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      servings: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      duration: this.formBuilder.group({
        value: [0, [Validators.required, Validators.min(1), Validators.max(60)]],
        unit: [TimeUnit.MINUTES, Validators.required],
      }),
      difficulty: [Difficulty.EASY, [Validators.required]],
      ingredients: this.formBuilder.array([
        this.createIngredientFormGroup(),
        this.createIngredientFormGroup()
      ]),
      preparation: ['', Validators.required]
    });
  }

  protected addIngredientFormGroup() {
    this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
  }

  protected removeIngredientFormGroup(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  protected submitForm() {
    if (this.recipeForm.invalid) {
      return;
    }

    const recipe = {
      ...this.recipeForm.getRawValue(),
      img: '/recipe_pictures/default.jpg',
      lastEdited: new Date().toISOString(),
    } as Recipe;

    this.recipeService.addNewRecipe(recipe).subscribe(() => {
      this.router.navigate(['recipes']);
    });
  }

  private createIngredientFormGroup(): FormGroup<IngredientForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(0.1)]],
    })
  }
}
