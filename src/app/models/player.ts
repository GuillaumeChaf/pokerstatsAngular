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

  constructor(v?: PlayerConfiguration) {
    Object.assign(this, v);
  }
}
