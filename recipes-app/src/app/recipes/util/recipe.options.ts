import { Difficulty, PortionUnits, TimeUnit } from "../models/recipe.model";

export const timeUnitOptions = [
  {
    value: TimeUnit.MINUTES,
    label: 'Minuten',
  },
  {
    value: TimeUnit.HOURES,
    label: 'Stunden',
  },
];
export const difficultyOptions = [
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
export const portionUnitOptions = [
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
