import { Component, computed, input, Input, Signal } from '@angular/core';
import { Card } from 'src/app/models/card';
import { cardValueConfig, symbolConfig } from 'src/app/models/card-configurations';

@Component({
  selector: 'app-card-rd',
  standalone: true,
  imports: [],
  templateUrl: './card-rd.component.html',
  styleUrl: './card-rd.component.scss',
})
export class CardRdComponent {
  /** carte à afficher */
  card = input.required<Card>();

  /** configuration du symbole de la carte */
  ngMSymbolConfig: Signal<symbolConfig> = computed(() => this.symbolConfig[this.card()?.symbol as number]);
  /** configuration de valeur de la carte */
  ngMValueConfig: Signal<cardValueConfig> = computed(() => this.valueConfig[this.card()?.value as number]);
  //#region constantes
  /** configuration de l'affichage des symboles */
  symbolConfig = symbolConfig;
  /** configuration de l'affichage des valeurs */
  valueConfig = cardValueConfig;
  //#endregion
}
