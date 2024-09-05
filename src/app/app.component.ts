import { Component, HostListener, inject } from '@angular/core';
import { PlayersFormComponent } from './components/players-form/players-form.component';
import { DirectionsComponent } from './components/secondary-components/directions/directions.component';
import { SubmitFormComponent } from './components/secondary-components/submit-form/submit-form.component';
import { AbstractControl, AsyncValidatorFn, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { headerHeight } from './models/player-configurations';
import { CardService } from './services/card.service';
import { ComputationService } from './services/computation.service';
import { ComputePrompt } from './models/compute-prompt';
import { catchError, map, Observable, of, take } from 'rxjs';
import { FormErrorHandlerService } from './services/form-error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [PlayersFormComponent, DirectionsComponent, SubmitFormComponent, ReactiveFormsModule],
})
export class AppComponent {
  /** hauteur du header configuré en pixels */
  headerHeight: number = headerHeight;
  /** provider du service de carte */
  cardS = inject(CardService);
  /** provider de gestion d'erreur lié au formulaire */
  fehS = inject(FormErrorHandlerService);
  computationS = inject(ComputationService);
  /** formulaire rassemblant les cartes et les différentes données de tous les joueurs */
  form!: FormGroup;
  /** validateur qui sera inclut dans le formulaire servant à vérifier qu'il n'y a pas de carte sélectionné qui seront en doublons */

  ngOnInit() {
    this.initForm();
  }

  /** fonction qui va renvoyer un validateur asynchrone pour check les cartes en doubles */
  getDuplicateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.fehS.duplicatedCards$.pipe(
        take(1),
        map((value) => (value.length ? { duplicates: `${value.length} cartes sont en double` } : null)),
        catchError(() => of(null)),
      );
    };
  }
  /** initialisation du formulaire */
  initForm() {
    this.form = new FormGroup({}, undefined, this.getDuplicateValidator());
  }

  /** validation du formulaire */
  submit() {
    if (this.form.valid) {
      const obj = new ComputePrompt(this.form.value);
      this.computationS.compute(obj);
    }
  }

  @HostListener('document:click')
  click() {
    this.cardS.changeStatePopUp(undefined, undefined);
  }
}
