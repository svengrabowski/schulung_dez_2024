import {Component, input} from '@angular/core';
import { MatError } from "@angular/material/form-field";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [MatError],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  public formControlWithErrors = input.required<FormControl>();
}
