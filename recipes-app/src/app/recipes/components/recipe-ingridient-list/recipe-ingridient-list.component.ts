import { Component, input } from '@angular/core';
import { Ingridient } from "../../model";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-recipe-ingridient-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './recipe-ingridient-list.component.html'
})
export class RecipeIngridientListComponent {
  public servings = input.required<number>();
  public ingridients = input.required<Ingridient[]>();
}
