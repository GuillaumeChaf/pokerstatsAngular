import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Card } from './card';
import { PlayerConfiguration } from './player-configurations';

export class Player {
  card1?: Card;
  card2?: Card;
  condition?: string;
  suit?: string;

  constructor(v?: Player) {}
}

export function getPlayerValidator({ name, id }: PlayerConfiguration): ValidatorFn {
  return (control: AbstractControl): null | ValidationErrors => {
    const card1: Card = control.get<string>('card1')?.value;
    const card2: Card = control.get('card2')?.value;

    const resC1 = card1.isComplete() ? null : { [`${id}_C1`]: `Carte n°1 ${name} manquante` };
    const resC2 = card2.isComplete() ? null : { [`${id}_C2`]: `Carte n°2 ${name} manquante` };
    return { ...resC1, ...resC2 };
  };
}
