import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecipeListComponent } from '@recipe/exports';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipeListComponent,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly navigation = [
    {
      routerLink: '/recipes/new',
      label: 'Neues Rezept',
      icon: 'note_add'
    }
  ]
}
