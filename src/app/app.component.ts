import { Component, HostListener, inject } from '@angular/core';
import { PlayersFormComponent } from './components/players-form/players-form.component';
import { DirectionsComponent } from './components/secondary-components/directions/directions.component';
import { SubmitFormComponent } from './components/secondary-components/submit-form/submit-form.component';
import { headerHeight } from './models/player-configurations';
import { CardService } from './services/card.service';
import { ComputationService } from './services/computation.service';
import { ComputePrompt } from './models/compute-prompt';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { FormErrorHandlerService } from './services/form-error-handler.service';
import { Card } from './models/card';
import { AbstractControl, AsyncValidatorFn, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [PlayersFormComponent, DirectionsComponent, SubmitFormComponent, ReactiveFormsModule],
})
export class AppComponent {
  //#region instance de service
  private _cardS = inject(CardService);
  private _fehS = inject(FormErrorHandlerService);
  private _computationS = inject(ComputationService);
  //#endregion

  /** formulaire rassemblant les cartes et les différentes données de tous les joueurs */
  form!: FormGroup;
  /** hauteur du header configuré en pixels */
  headerHeight: number = headerHeight;

  /** observable des cartes dupliqués pour les validateurs */
  duplicatedCards$: BehaviorSubject<Card[]> = this._fehS.duplicatedCards$;

  ngOnInit() {
    this.initForm();
  }

  /** fonction qui va renvoyer un validateur asynchrone pour check les cartes en doubles */
  getDuplicateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.duplicatedCards$.pipe(
        take(1),
        map((value) => {
          return value.length ? { duplicates: `${value.length} cartes sont en double` } : null;
        }),
      );
    };
  }

  /** initialisation du formulaire */
  initForm() {
    this.form = new FormGroup({}, undefined, this.getDuplicateValidator());
    this._fehS.duplicatedCards$.subscribe(() => this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false }));
  }

  /** validation du formulaire */
  submit() {
    if (this.form.valid) {
      const obj = new ComputePrompt(this.form.value, this._cardS.cardDataBaseSig());
      this._computationS.compute(obj);
    }
  }

  /**
   * lien vers linkedin
   */
  link() {
    window.open('http://www.linkedin.com/in/guillaume-chafiol-915715177', '_blank');
  }

  @HostListener('document:click')
  click() {
    this._cardS.changeStatePopUp(undefined, undefined);
  }
}
