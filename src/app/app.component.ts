import { Component, HostListener, inject, Injector } from '@angular/core';
import { PlayersFormComponent } from './components/players-form/players-form.component';
import { DirectionsComponent } from './components/secondary-components/directions/directions.component';
import { SubmitFormComponent } from './components/secondary-components/submit-form/submit-form.component';
import { AbstractControl, AsyncValidatorFn, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { headerHeight } from './models/player-configurations';
import { CardService } from './services/card.service';
import { ComputationService } from './services/computation.service';
import { ComputePrompt } from './models/compute-prompt';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, of, take } from 'rxjs';
import { FormErrorHandlerService } from './services/form-error-handler.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Card } from './models/card';

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
  duplicatedCards$: BehaviorSubject<Card[]> = this._fehS.missingCardsDataBase$;

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
    this._fehS.missingCardsDataBase$.subscribe(() => this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false }));
  }

  /** validation du formulaire */
  submit() {
    if (this.form.valid) {
      const obj = new ComputePrompt(this.form.value);
      this._computationS.compute(obj);
    }
  }

  @HostListener('document:click')
  click() {
    this._cardS.changeStatePopUp(undefined, undefined);
  }
}
