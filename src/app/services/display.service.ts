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
  private _fehS = inject(FormErrorHandlerService);
  private _computationS = inject(ComputationService);
  //#endregion

  //#region différentes données collectées faisant évoluer l'état d'affichage
  private _duplicatesSig: Signal<any>; //WritableSignal<any[]> = signal([]);
  private _missingsSig!: Signal<any>; //WritableSignal<ValidationErrors> = signal({});
  private _computationSig: WritableSignal<StatForm | null> = signal(null);
  private _errorsSig: WritableSignal<string | null> = signal(null);
  //#endregion

  /** état précédent de computationState */
  private _prevComputationState: computationState = null;
  /** null = cas ou le formulaire a été touché et qu'on ne veut plus afficher les résultats */
  private _computationStateSig: Signal<computationState> = computed(() => {
    const computation = this._computationSig();
    const errors = this._errorsSig();
    if (!computation && !errors) return 'pending';
    else if (computation) return 'callback';
    else if (errors) return 'computationError';
    return null;
  });

  /** signal actuel enregistré sous forme de variable pour éviter des erreurs de lectures */
  private _currDisplayState: submitTpl = 'userError';
  /** template affiché globalant sur la page */
  displayStateSig: Signal<submitTpl> = computed(() => {
    const userError: boolean = Object.keys(this._missingsSig()).length > 0 || this._duplicatesSig().length > 0;
    const computationState: computationState = this._computationStateSig();
    const displayCurr: submitTpl = this._currDisplayState;

    if (displayCurr === 'pending') return (computationState ?? 'pending') as submitTpl;
    else if (
      (['computationError', 'pending', 'callback'] as computationState[]).includes(computationState) &&
      this._prevComputationState != computationState
    ) {
      return computationState as submitTpl;
    } else return (userError ? 'userError' : 'noError') as submitTpl;
  });

  constructor() {
    effect(() => {
      this._currDisplayState = this.displayStateSig();
    });
    effect(() => {
      this._prevComputationState = this._computationStateSig();
    });
    // this._duplicates = toSignal(this.fehS.duplicatedCards$);
    // this._missings = toSignal(this.fehS.missingCardsDataBase$);
    // this._computation = toSignal(this.computationS.callback$);
    // this._errors = toSignal(this.computationS.error$);

    this._duplicatesSig = this._fehS.duplicatedCardsSig;
    this._missingsSig = this._fehS.missingCardsDataBaseSig;
    this._computationSig = this._computationS.callbackSig;
    this._errorsSig = this._computationS.errorSig;
    // this.fehS.missingCardsDataBase$.subscribe((v) => {
    //   this._missings.set(v as any);
    // });
  }
}
