export class PlayerConfiguration {
  /** identifiant du joueur */
  id!: string;
  /** nom du joueur (déco) */
  name!: string;
  /** position de la frame de table (formulaire avec les 2 cartes) du joueur en Y */
  bottom!: number;
  /** position de la frame de table (formulaire avec les 2 cartes) du joueur en X */
  left!: number;
  /** position de la frame de sélection de carte en X */
  cardsLeft!: number;
  /** position de la frame de sélection de carte en Y */
  cardsBottom!: number;
  /** valeur par défault de l'état d'activation */
  defaultActiv!: boolean;
  /** position de la frame des outs */
  outsR!: boolean;

  constructor(v?: PlayerConfiguration) {
    Object.assign(this, v);
  }
}

export const playerListConfiguration: { [key: string]: PlayerConfiguration } = {
  1: new PlayerConfiguration({
    defaultActiv: false,
    id: '1',
    name: 'Mike',
    bottom: 555,
    left: 408,
    cardsLeft: 0,
    cardsBottom: -195,
    outsR: false,
  }),
  2: new PlayerConfiguration({
    defaultActiv: false,
    id: '2',
    name: 'Phil',
    bottom: 415,
    left: 160,
    cardsLeft: 0,
    cardsBottom: 115,
    outsR: false,
  }),
  3: new PlayerConfiguration({
    defaultActiv: false,
    id: '3',
    name: 'Antonio',
    bottom: 235,
    left: 160,
    cardsLeft: 0,
    cardsBottom: 115,
    outsR: false,
  }),
  4: new PlayerConfiguration({
    defaultActiv: true,
    id: '4',
    name: 'Tom',
    bottom: 55,
    left: 408,
    cardsLeft: 0,
    cardsBottom: 115,
    outsR: false,
  }),
  5: new PlayerConfiguration({
    defaultActiv: true,
    id: '5',
    name: 'Daniel',
    bottom: 55,
    left: 674,
    cardsLeft: -93,
    cardsBottom: 115,
    outsR: true,
  }),
  6: new PlayerConfiguration({
    defaultActiv: false,
    id: '6',
    name: 'Gus',
    bottom: 235,
    left: 923,
    cardsLeft: -93,
    cardsBottom: 115,
    outsR: true,
  }),
  7: new PlayerConfiguration({
    defaultActiv: false,
    id: '7',
    name: 'Vanessa',
    bottom: 415,
    left: 923,
    cardsLeft: -93,
    cardsBottom: 115,
    outsR: true,
  }),
  8: new PlayerConfiguration({
    defaultActiv: false,
    id: '8',
    name: 'Doyle',
    bottom: 555,
    left: 674,
    cardsLeft: -93,
    cardsBottom: -195,
    outsR: true,
  }),
};

export const headerHeight = 75;
