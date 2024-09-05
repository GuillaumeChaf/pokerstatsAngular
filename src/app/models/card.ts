import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CardService } from '../services/card.service';
import { inject } from '@angular/core';

export class Card {
  id?: string;
  /** symbole de la carte (coeur, trèfle...) */
  symbol?: Symbol;
  /** valeur (As, roi...) */
  value?: number;

  get uniqueValue() {
    return `S${this.symbol}V${this.value}`;
  }
  constructor(id?: string) {
    this.id = id;
  }
  /** fonction pour savoir si la carte est entièrement complété ou non */
  isComplete(): boolean {
    return this.symbol != null && this.value != null;
  }
  /** construction d'un meme objet avec une référence différente */
  newRef() {
    const newRef: Card = new Card(this.id);
    Object.assign(newRef, this);
    return newRef;
  }

  static createCard(card: Card): Card {
    return Object.assign(new Card(), card);
  }
}

export function getCardValidator(a: CardService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // return doublonsNumber ? { doublons: `${doublonsNumber} sont présents` } : null;
    return {};
  };
}

export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
