export class Card {
  /** symbole de la carte (coeur, trèfle...) */
  symbol?: Symbol;
  /** valeur (As, roi...) */
  value?: number;

  /** fonction pour savoir si la carte est entièrement complété ou non */
  isComplete(): boolean {
    return this.symbol != null && this.value != null;
  }
}

export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
//#region configuration
export type symbolConfig = {
  svgPath: string;
  color: string;
  viewBox: string;
  value: Symbol;
};
/** configuration de l'affichage des symboles de carte */
export const symbolConfig: { [key: number]: symbolConfig } = {
  [Symbol.Diamond]: {
    svgPath: 'diamond',
    color: 'red',
    viewBox: '0 0 512 512',
    value: Symbol.Diamond,
  },
  [Symbol.Heart]: {
    svgPath: 'heart',
    color: 'red',
    viewBox: '0 0 512 512',
    value: Symbol.Heart,
  },
  [Symbol.Club]: {
    svgPath: 'club',
    color: 'black',
    viewBox: '0 0 512 512',
    value: Symbol.Club,
  },
  [Symbol.Spade]: {
    svgPath: 'spade',
    color: 'black',
    viewBox: '0 0 16 16',
    value: Symbol.Spade,
  },
};

export type cardValueConfig = { value: number; label: string };
/** configuration de l'affichage des valeurs de cartes */
export const cardValueConfig: { [key: number]: cardValueConfig } = {
  2: { label: '2', value: 2 },
  3: { label: '3', value: 3 },
  4: { label: '4', value: 4 },
  5: { label: '5', value: 5 },
  6: { label: '6', value: 6 },
  7: { label: '7', value: 7 },
  8: { label: '8', value: 8 },
  9: { label: '9', value: 9 },
  10: { label: '10', value: 10 },
  11: { label: 'J', value: 11 },
  12: { label: 'Q', value: 12 },
  13: { label: 'K', value: 13 },
  14: { label: 'A', value: 14 },
};
//#endregion
