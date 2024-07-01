import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-preparation',
  standalone: true,
  imports: [],
  templateUrl: './recipe-preparation.component.html'
})
export class RecipePreparationComponent {
  public preparation = input.required<string>();
}
