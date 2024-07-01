import { Recipe, RecipeDto } from "../model";

export function mapRecipeDtoToRecipe(recipeDto: RecipeDto): Recipe {
    return {
        name: recipeDto.name,
        img: recipeDto.img,
        servings: recipeDto.portions,
        duration: recipeDto.duration,
        difficulty: recipeDto.level_of_difficulty,
        ingridients: [ ...recipeDto.ingridients ],
        preparation: recipeDto.preparation
    }
};

export function mapRecipeDtoArrayToRecipeArray(recipeDtos: RecipeDto[]): Recipe[] {
    return recipeDtos.map(recipeDto => mapRecipeDtoToRecipe(recipeDto));
};

export function mapRecipeToRecipeDto(recipe: Recipe): RecipeDto {
    return {
        name: recipe.name,
        img: recipe.img,
        portions: recipe.servings,
        duration: recipe.duration,
        level_of_difficulty: recipe.difficulty,
        ingridients: [ ...recipe.ingridients ],
        preparation: recipe.preparation
    }
};