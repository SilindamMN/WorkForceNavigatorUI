import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from "./auth/auth-page/auth-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforcenavigatorui';
}
