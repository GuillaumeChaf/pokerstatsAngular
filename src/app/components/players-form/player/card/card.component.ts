import { Component, forwardRef, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => CardComponent) }],
})
export class CardComponent implements ControlValueAccessor {
  /** valeur de carte qui sera affiché */
  ngModel = model<Card>();
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
}
