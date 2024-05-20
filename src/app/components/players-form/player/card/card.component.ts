import { KeyValue, KeyValuePipe, NgClass } from '@angular/common';
import { Component, Input, WritableSignal, forwardRef, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Card, Symbol, cardValueConfig, symbolConfig } from 'src/app/models/card';
import { PlayerConfiguration } from 'src/app/models/player';

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
  onChange?: (value: string) => void;
  onTouched?: () => void;
  writeValue(card: Card): void {
    this.ngModel.set(card);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  //#endregion
  pickerDDStateSig: WritableSignal<boolean> = signal(false);

  /** position par défaut de la popUp */
  defaultPopupPosition = { bottom: 200, left: 50 };
  /** configuration de l'affichage des symboles */
  symbolConfig = symbolConfig;
  /** configuration de l'affichage des valeurs */
  valueConfig = cardValueConfig;

  /** fonction d'ordonnancement des valeurs */
  orderFnc: (a: KeyValue<string, cardValueConfig>, b: KeyValue<string, cardValueConfig>) => number = (
    { value: valueA },
    { value: valueB },
  ): number => {
    return valueA.value - valueB.value;
  };

  /** modification de la valeur de la carte */
  setValue(value: number) {
    this.ngModel.update((v) => {
      if (!v) return;
      v.value = v.value === value ? undefined : value;
      return v;
    });
  }

  /** modification du symbole de la carte */
  setSymbol(symbol: Symbol) {
    this.ngModel.update((v) => {
      if (!v) return;
      v.symbol = v.symbol === symbol ? undefined : symbol;
      return v;
    });
  }
}
