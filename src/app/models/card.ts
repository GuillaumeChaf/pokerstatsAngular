export class Card {
  /** symbole de la carte (coeur, trèfle...) */
  symbol?: Symbol;
  /** valeur (As, roi...) */
  value?: number;

  constructor(v?: Card) {
    Object.assign(this, v);
  }
  /** fonction pour savoir si la carte est entièrement complété ou non */
  isComplete(): boolean {
    return this.symbol != null && this.value != null;
  }
  /** meme objet avec une référence différence */
  newRef(card: Card) {
    return new Card(card);
  }
}

export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
