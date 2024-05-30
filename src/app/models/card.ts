export class Card {
  id: string;
  /** symbole de la carte (coeur, trèfle...) */
  symbol?: Symbol;
  /** valeur (As, roi...) */
  value?: number;

  get uniqueValue() {
    return `S${this.symbol}V${this.value}`;
  }
  constructor(id: string) {
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
}

export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
