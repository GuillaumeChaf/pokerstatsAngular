import { Component } from '@angular/core';
import { PlayersFormComponent } from './components/players-form/players-form.component';
import { DirectionsComponent } from './components/secondary-components/directions/directions.component';
import { SubmitFormComponent } from './components/secondary-components/submit-form/submit-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { headerHeight } from './models/configurations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [PlayersFormComponent, DirectionsComponent, SubmitFormComponent, ReactiveFormsModule],
})
export class AppComponent {
  /** formulaire rassemblant les cartes et les différentes données de tous les joueurs */
  form: FormGroup = new FormGroup({});
  /** hauteur du header configuré en pixels */
  headerHeight: number = headerHeight;

  submit() {
    console.log(this.form.value);
  }
}
