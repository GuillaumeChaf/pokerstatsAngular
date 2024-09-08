import { computed, effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { FormErrorHandlerService } from './form-error-handler.service';
import { ComputationService } from './computation.service';
import StatForm from '../models/stats-callback';
import { computationState, stateCalculator, submitTpl } from '../models/display';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  //#region instances de service
  private _fehS = inject(FormErrorHandlerService);
  private _computationS = inject(ComputationService);
  //#endregion

  //#region différentes données collectées faisant évoluer l'état d'affichage
  private _duplicatesSig: Signal<any>;
  private _missingsSig!: Signal<any>;
  private _computationSig: WritableSignal<StatForm | null> = signal(null);
  private _errorsSig: WritableSignal<string | null> = signal(null);
  //#endregion

  /** null = cas ou le formulaire a été touché et qu'on ne veut plus afficher les résultats */
  private _computationStateSig: Signal<computationState> = computed(() => {
    const computation = this._computationSig();
    const errors = this._errorsSig();
    if (!computation && !errors) return 'pending';
    else if (computation) return 'submit';
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
    return stateCalculator[displayCurr](userError, computationState);
    // return 'pending';
  });

  constructor() {
    this._duplicatesSig = this._fehS.duplicatedCardsSig;
    this._missingsSig = this._fehS.missingCardsDataBaseSig;
    this._computationSig = this._computationS.callbackSig;
    this._errorsSig = this._computationS.errorSig;
    effect(() => {
      this._currDisplayState = this.displayStateSig();
    });
  }
}
