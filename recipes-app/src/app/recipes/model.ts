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

export interface Ingridient {
    unit: PortionUnits;
    quantity: number;
    name: string;
}

export interface Recipe {
    id: string;
    name: string;
    img: string;
    servings: number;
    duration: Duration;
    difficulty: Difficulty;
    ingridients: Ingridient[];
    preparation: string;
}

export interface RecipeDto {
    id: string;
    name: string;
    img: string;
    portions: number;
    duration: Duration;
    level_of_difficulty: Difficulty;
    ingridients: Ingridient[];
    preparation: string;
}