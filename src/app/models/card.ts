export class Card {
  /** symbole de la carte (coeur, trèfle...) */
  symbol?: Symbol;
  /** valeur (As, roi...) */
  value?: number;
}

export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
