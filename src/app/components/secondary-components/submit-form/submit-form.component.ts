import { AsyncPipe, KeyValuePipe, NgClass } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from 'src/app/models/card';
import { CardRdComponent } from '../../players-form/player/card/card-rd/card-rd.component';
import { MatButtonModule } from '@angular/material/button';
import { ControlContainer, FormGroup } from '@angular/forms';
import { FormErrorHandlerService } from 'src/app/services/form-error-handler.service';
import { NgLetModule } from 'ng-let';
import { ComputationService } from 'src/app/services/computation.service';
import StatForm from 'src/app/models/stats-callback';
import { DisplayService, submitTpl } from 'src/app/services/display.service';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [MatButtonModule, NgLetModule, CardRdComponent, NgClass, AsyncPipe, KeyValuePipe],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss',
})
export class SubmitFormComponent {
  //#region récupération du formulaire parent
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  //#endregion
  //#region gestion des messages d'erreurs
  /** instance du service de gestion d'erreur */
  fehS = inject(FormErrorHandlerService);
  /** base de données des cartes sélectionnées */
  duplicatedCards$!: Observable<Card[]>;
  /** observable écoutant les messages d'erreurs */
  missingCardsMsg$!: Observable<{ [key: string]: string }>;
  //#endregion
  //#region gestion de l'affichage des données de split
  /** instance du service de calcul */
  computationS = inject(ComputationService);
  /** retour de calcul */
  computationCallback$: Subject<StatForm | null>;
  //#endregion
  displayS = inject(DisplayService);
  /** template affiché dans le cadre */
  tplDisplate!: Signal<submitTpl>;

  test = {
    statPerc: 66.7,
    outs: [Card.createCard({ value: 5, symbol: 2 } as Card), Card.createCard({ value: 4, symbol: 3 } as Card)],
  };

  //#endregion
  constructor() {
    this.duplicatedCards$ = this.fehS.duplicatedCards$;
    this.missingCardsMsg$ = this.fehS.missingCardsDataBase$;
    this.computationCallback$ = this.computationS.callback$;
    this.tplDisplate = this.displayS.displayState;
  }
}
