export class Player {
  /** identifiant du joueur */
  id!: string;

  constructor(v?: Player) {
    Object.assign(this, v);
  }
}
