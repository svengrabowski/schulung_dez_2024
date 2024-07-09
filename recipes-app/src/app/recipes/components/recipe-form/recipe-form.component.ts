import { Component, inject, input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { FormErrorComponent, isDefined } from "@shared/exports";
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
import { toObservable } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, filter, switchMap } from "rxjs";
import { difficultyOptions, portionUnitOptions, timeUnitOptions } from "../../util/recipe.options";

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
  public recipeId = input<string>();

  protected recipeForm: FormGroup<RecipeForm>;
  protected recipeToEdit: Recipe | undefined;
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

    toObservable(this.recipeId)
      .pipe(
        distinctUntilChanged(),
        filter(isDefined),
        switchMap(id => this.recipeService.getRecipe(id)),
      )
      .subscribe(recipe => {
        this.recipeToEdit = recipe;
        this.recipeToEdit.ingredients.forEach((_,index) => {
          if (index > 1) {
            this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
          }
        });
        this.recipeForm.patchValue(this.recipeToEdit);
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
      img: '/recipe_pictures/default.jpg',
      ...this.recipeToEdit,
      ...this.recipeForm.getRawValue(),
      lastEdited: new Date().toISOString(),
    } as Recipe;

    if(this.recipeToEdit) {
      this.recipeService.updateRecipe(recipe)
        .subscribe(() => {
          this.router.navigate(['recipes', recipe.id]);
        });
    } else {
      this.recipeService.addNewRecipe(recipe)
        .subscribe(() => {
          this.router.navigate(['recipes']);
        });
    }
  }

  private createIngredientFormGroup(): FormGroup<IngredientForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(0.1)]],
    })
  }
}
