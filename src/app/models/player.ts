export class PlayerConfiguration {
  /** identifiant du joueur */
  id!: string;
  /** position de la frame de table (formulaire avec les 2 cartes) du joueur en Y */
  bottom!: number;
  /** position de la frame de table (formulaire avec les 2 cartes) du joueur en X */
  left!: number;

  constructor(v?: PlayerConfiguration) {
    Object.assign(this, v);
  }
}
