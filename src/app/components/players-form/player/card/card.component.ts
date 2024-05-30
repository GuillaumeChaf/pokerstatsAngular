import { KeyValue, KeyValuePipe, NgClass } from '@angular/common';
import { Component, Input, Signal, TemplateRef, ViewChild, ViewContainerRef, computed, forwardRef, inject, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Card, Symbol } from 'src/app/models/card';
import { cardValueConfig, defaultPopupPosition, popUpSize, symbolConfig } from 'src/app/models/card-configurations';
import { PlayerConfiguration } from 'src/app/models/player';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, KeyValuePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => CardComponent) }],
})
export class CardComponent implements ControlValueAccessor {
  /** valeur de carte qui sera affiché */
  ngModel = model<Card>();
  /** configuration optionnelle utile notammenet pour la positionnement de la popUp */
  @Input() conf?: PlayerConfiguration;
  //#region implémentation de ControlValueAccessor
  onChange: (value: Card) => void = (v: Card) => {
    this.ngModel.set(v);
  };
  onTouched: () => void = () => {};
  writeValue(card: Card): void {
    this.ngModel.set(card);
  }
  registerOnChange(fn: (value: Card) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  //#endregion
  /** service de gestion des cartes */
  cardS = inject(CardService);

  //#region variables pour la popUp
  /** taille de la popUp */
  popUpSize = popUpSize;
  /** position par défaut de la popUp */
  defaultPopupPosition = defaultPopupPosition;
  /** configuration de l'affichage des symboles */
  symbolConfig = symbolConfig;
  /** configuration de l'affichage des valeurs */
  valueConfig = cardValueConfig;
  //#endregion
  /** configuration du symbole de la carte */
  ngMSymbolConfig: Signal<symbolConfig | undefined> = computed(() => this.symbolConfig[this.ngModel()?.symbol as number]);
  /** configuration de valeur de la carte */
  ngMValueConfig: Signal<cardValueConfig | undefined> = computed(() => {
    const v = this.ngModel()?.value as number;
    return this.valueConfig[v];
  });

  /** fonction d'ordonnancement des valeurs */
  orderFnc: (a: KeyValue<string, cardValueConfig>, b: KeyValue<string, cardValueConfig>) => number = (
    { value: valueA },
    { value: valueB },
  ): number => {
    return valueA.value - valueB.value;
  };
  /** template de la popUp */
  @ViewChild('popUpTemplate') popUpTemplate!: TemplateRef<HTMLDivElement>;
  /** container de la popUp */
  @ViewChild('popUpContainer', { read: ViewContainerRef }) popUpContainer!: ViewContainerRef;

  changeStatePopUp(e: any) {
    this.cardS.changeStatePopUp(this.popUpContainer, this.popUpTemplate);
    e.stopPropagation();
  }

  /** modification de la valeur de la carte */
  setValue(value: number) {
    this.ngModel.update((v) => {
      if (!v) return;
      v.value = v.value === value ? undefined : value;
      const vNewRef = this.cardS.registerNewCard(v);
      this.onChange(vNewRef);
      return vNewRef;
    });
  }

  /** modification du symbole de la carte */
  setSymbol(symbol: Symbol) {
    this.ngModel.update((v) => {
      if (!v) return;
      v.symbol = v.symbol === symbol ? undefined : symbol;
      const vNewRef = this.cardS.registerNewCard(v);
      this.onChange(vNewRef);
      return vNewRef;
    });
  }

  /** simple fonction pour éviter la fermeture de la popUp si l'on clique sur cette popUp */
  clickOnPopUp(e: any) {
    e.stopPropagation();
  }
}
