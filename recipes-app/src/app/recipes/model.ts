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
    name: string;
    img: string;
    servings: number;
    lastEdited: string;
    duration: Duration;
    difficulty: Difficulty;
    ingridients: Ingridient[];
    preparation: string;
}
