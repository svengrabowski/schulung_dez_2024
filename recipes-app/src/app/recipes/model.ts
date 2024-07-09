import {FormArray, FormControl, FormGroup} from "@angular/forms";

export enum TimeUnit {
    MINUTES = 'Min.',
    HOURES = 'Std.',
}

export enum Difficulty {
    EASY = 'Einfach',
    MEDIUM = 'Mittel',
    HARD = 'Schwer'
}

export enum PortionUnits {
    NONE = '',
    GRAM = 'g',
    CUBE = 'Würfel',
    MILILITER = 'ml',
    TEASPOON = 'TL',
    TABLESPOON = 'EL',
    BALL = 'Kugel',
    PINCH = 'Prise',
}

export interface Duration {
    unit: TimeUnit;
    value: number;
}

export interface Ingredient {
    unit: PortionUnits;
    quantity: number;
    name: string;
}

export interface Recipe {
    id: string;
    name: string;
    img: string;
    servings: number;
    lastEdited: string;
    duration: Duration;
    difficulty: Difficulty;
    ingredients: Ingredient[];
    preparation: string;
}

export interface RecipeDto {
    id: string;
    name: string;
    img: string;
    portions: number;
    lastEdited: string;
    duration: Duration;
    level_of_difficulty: Difficulty;
    ingredients: Ingredient[];
    preparation: string;
}

export interface IngredientForm {
  name: FormControl<string>;
  unit: FormControl<PortionUnits>;
  quantity: FormControl<number>;
}

export interface durationForm {
  value: FormControl<number>;
  unit: FormControl<TimeUnit>;
}

export interface RecipeForm {
  name: FormControl<string>;
  servings: FormControl<number>;
  duration: FormGroup<durationForm>;
  difficulty: FormControl<Difficulty>;
  ingredients: FormArray<FormGroup<IngredientForm>>;
  preparation: FormControl<string>;
}
