import { Component, inject, input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { FormErrorComponent, isDefined } from "@shared/exports";
import { Difficulty, PortionUnits, Recipe, TimeUnit } from "../../model";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { RecipeService } from "../../services/recipe.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Router } from "@angular/router";
import { toObservable } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, filter, switchMap, tap } from "rxjs";
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
  ],
  templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent {
  public recipeId = input<string>();

  protected recipeForm;
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
      ingridients: this.formBuilder.array([
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
        this.recipeToEdit.ingridients.forEach((_,index) => {
          if (index > 1) {
            this.recipeForm.controls.ingridients.push(this.createIngredientFormGroup());
          }
        });
        this.recipeForm.patchValue(this.recipeToEdit);
      });
  }

  protected addIngredientFormGroup() {
    this.recipeForm.controls.ingridients.push(this.createIngredientFormGroup());
  }

  protected removeIngredientFormGroup(index: number) {
    this.recipeForm.controls.ingridients.removeAt(index);
  }

  protected submitForm() {
    if (this.recipeForm.valid) {
      const recipe = {
        img: '/recipe_pictures/default.jpg',
        ...this.recipeToEdit,
        ...this.recipeForm.getRawValue(),
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
  }

  private createIngredientFormGroup(): FormGroup<{ name: FormControl<string>; unit: FormControl<PortionUnits>; quantity: FormControl<number>; }> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(0.1)]],
    })
  }
}
