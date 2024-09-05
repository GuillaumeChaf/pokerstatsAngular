import { computed, effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormErrorHandlerService } from './form-error-handler.service';
import { ComputationService } from './computation.service';
import { ValidationErrors } from '@angular/forms';
import StatForm from '../models/stats-callback';

export type submitTpl = 'userError' | 'noError' | 'pending' | 'submit' | 'computationError';
export type computationState = 'computationError' | 'pending' | 'callback' | null;

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  //#region instances de service
  fehS = inject(FormErrorHandlerService);
  computationS = inject(ComputationService);
  //#endregion

  //#region différentes données collectées faisant évoluer l'état d'affichage
  private _duplicates: Signal<any>; //WritableSignal<any[]> = signal([]);
  private _missings!: Signal<any>; //WritableSignal<ValidationErrors> = signal({});
  private _computation!: Signal<any>; //WritableSignal<StatForm | null> = signal(null);
  private _errors!: Signal<any>; //WritableSignal<string | null> = signal(null);
  //#endregion

  /** état précédent de computationState */
  private prevComputationState: computationState = null;
  /** null = cas ou le formulaire a été touché et qu'on ne veut plus afficher les résultats */
  private computationState: Signal<computationState> = computed(() => {
    // this.prevComputationState = this.computationState();
    const computation = this._computation();
    const errors = this._errors();
    if (!computation && !errors) return 'pending';
    else if (computation) return 'callback';
    else if (errors) return 'computationError';
    return null;
  });

  /** signal actuel enregistré sous forme de variable pour éviter des erreurs de lectures */
  _currDisplayState: submitTpl = 'userError';
  /** template affiché globalant sur la page */
  displayState: Signal<submitTpl> = computed(() => {
    const userError: boolean = Object.keys(this._missings()).length > 0 || this._duplicates().length > 0;
    const computationState: computationState = this.computationState();
    const displayCurr: submitTpl = this._currDisplayState;

    if (displayCurr === 'pending') return (computationState ?? 'pending') as submitTpl;
    else if (
      (['computationError', 'pending', 'callback'] as computationState[]).includes(computationState) &&
      this.prevComputationState != computationState
    ) {
      return computationState as submitTpl;
    } else return (userError ? 'userError' : 'noError') as submitTpl;
  });

  constructor() {
    effect(() => {
      this._currDisplayState = this.displayState();
    });
    this._duplicates = toSignal(this.fehS.duplicatedCards$);
    this._missings = toSignal(this.fehS.missingCardsDataBase$);
    this._computation = toSignal(this.computationS.callback$);
    this._errors = toSignal(this.computationS.error$);

    // this._duplicates = this.fehS.duplicatedCards$;
    // this._missings = this.fehS.missingCardsDataBase$;
    // this.fehS.missingCardsDataBase$.subscribe((v) => {
    //   this._missings.set(v as any);
    // });
  }
}
