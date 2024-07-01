import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { FormErrorComponent } from "@shared/exports";
import {Difficulty, PortionUnits, Recipe, TimeUnit} from "../../model";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { RecipeService } from "../../services/recipe.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {Router} from "@angular/router";

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
  protected recipeForm;
  protected timeUnitOptions = [
    {
      value: TimeUnit.MINUTES,
      label: 'Minuten',
    },
    {
      value: TimeUnit.HOURES,
      label: 'Stunden',
    },
  ];
  protected difficultyOptions = [
    {
      value: Difficulty.EASY,
      label: 'Einfach',
    },
    {
      value: Difficulty.MEDIUM,
      label: 'Mittel',
    },
    {
      value: Difficulty.HARD,
      label: 'Schwer',
    },
  ];
  protected portionUnitOptions = [
    {
      value: PortionUnits.NONE,
      label: 'Keine',
    },
    {
      value: PortionUnits.GRAM,
      label: 'Gramm',
    },
    {
      value: PortionUnits.CUBE,
      label: 'Würfel',
    },
    {
      value: PortionUnits.MILILITER,
      label: 'Milliliter',
    },
    {
      value: PortionUnits.TEASPOON,
      label: 'Teelöffel',
    },
    {
      value: PortionUnits.TABLESPOON,
      label: 'Esslöffel',
    },
    {
      value: PortionUnits.BALL,
      label: 'Kugel',
    },
    {
      value: PortionUnits.PINCH,
      label: 'Prise',
    },
  ];

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
        ...this.recipeForm.getRawValue(),
        img: '/recipe_pictures/default.jpg',
      } as Recipe;
      this.recipeService.addNewRecipe(recipe).subscribe(() => {
        this.router.navigate(['recipes']);
      });
    }
  }

  private createIngredientFormGroup(): FormGroup<{ name: FormControl<string>; unit: FormControl<PortionUnits>; quantity: FormControl<number>; }> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(1)]],
    })
  }
}
