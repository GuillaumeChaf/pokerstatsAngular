import { Symbol } from './card';

//#region configuration de certaines position liées aux cartes
export const popUpSize = {
  width: 138,
  height: 180,
};
export const defaultPopupPosition = { bottom: 90, left: 0 };
//#endregion
//#region configuration du visuel de pick de carte
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
