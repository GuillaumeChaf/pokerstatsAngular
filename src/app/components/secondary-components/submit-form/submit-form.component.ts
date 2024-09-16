import { AsyncPipe, KeyValuePipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardRdComponent } from '../../players-form/player/card/card-rd/card-rd.component';
import { MatButtonModule } from '@angular/material/button';
import { ControlContainer, FormGroup } from '@angular/forms';
import { FormErrorHandlerService } from 'src/app/services/form-error-handler.service';
import { NgLetModule } from 'ng-let';
import { ComputationService } from 'src/app/services/computation.service';
import StatForm from 'src/app/models/stats-callback';
import { DisplayService } from 'src/app/services/display.service';
import { submitTpl } from 'src/app/models/display';
import { OutListComponent } from '../../players-form/player/card/out-list/out-list.component';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [MatButtonModule, NgLetModule, CardRdComponent, OutListComponent, NgClass, AsyncPipe, KeyValuePipe],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss',
})
export class SubmitFormComponent {
  //#region récupération du formulaire parent
  private _parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this._parentContainer.control as FormGroup;
  }
  //#endregion
  //#region gestion des messages d'erreurs
  /** instance du service de gestion d'erreur */
  private _fehS = inject(FormErrorHandlerService);
  /** base de données des cartes sélectionnées */
  duplicatedCardsSig!: Signal<Card[]>;
  /** observable écoutant les messages d'erreurs */
  missingCardsMsgSig!: WritableSignal<{ [key: string]: string }>;
  //#endregion
  //#region gestion de l'affichage des données de split
  /** instance du service de calcul */
  private _computationS = inject(ComputationService);
  /** retour de calcul */
  computationCallbackSig: WritableSignal<StatForm | null>;
  //#endregion
  private _displayS = inject(DisplayService);
  /** template affiché dans le cadre */
  tplDisplateSig!: Signal<submitTpl>;

  //#endregion
  constructor() {
    this.duplicatedCardsSig = this._fehS.duplicatedCardsSig;
    this.missingCardsMsgSig = this._fehS.missingCardsDataBaseSig;
    this.computationCallbackSig = this._computationS.callbackSig;
    this.tplDisplateSig = this._displayS.displayStateSig;
  }
}
