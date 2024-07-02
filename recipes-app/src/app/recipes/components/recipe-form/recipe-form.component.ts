import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  Difficulty,
  IngridientForm,
  PortionUnits,
  Recipe,
  RecipeForm,
  TimeUnit
} from "../../model";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { RecipeService } from "../../services/recipe.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Router } from "@angular/router";
import { difficultyOptions, portionUnitOptions, timeUnitOptions } from "../../util/recipe.options";
import {FormErrorComponent} from "@shared/exports";

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
      ingridients: this.formBuilder.array([
        this.createIngridientFormGroup(),
        this.createIngridientFormGroup()
      ]),
      preparation: ['', Validators.required]
    });
  }

  protected addIngredientFormGroup() {
    this.recipeForm.controls.ingridients.push(this.createIngridientFormGroup());
  }

  protected removeIngredientFormGroup(index: number) {
    this.recipeForm.controls.ingridients.removeAt(index);
  }

  protected submitForm() {
    if (this.recipeForm.valid) {
      const recipe = {
        ...this.recipeForm.getRawValue(),
        img: '/recipe_pictures/default.jpg',
      } as Recipe;
      this.recipeService.addNewRecipe(recipe).subscribe(() => {
        this.router.navigate(['recipes']);
      });
    }
  }

  private createIngridientFormGroup(): FormGroup<IngridientForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(0.1)]],
    })
  }
}
