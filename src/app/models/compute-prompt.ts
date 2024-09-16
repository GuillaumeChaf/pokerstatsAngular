import { Card } from './card';
import { Player } from './player';

export class ComputePrompt {
  players?: { [key: number]: Player } = {};
  table?: { [key: string]: Card } = {};
  trash?: Card[] = [];

  constructor(v?: ComputePrompt, cardDataBase: Card[] | null = null) {
    Object.assign(this, v);
    if (cardDataBase) this.trash = this.setTrash(cardDataBase);
  }

  /**
   * lissage des formulaires pour en faire des objets plus facile à utiliser
   * @returns un objet facile à utiliser pour le back
   */
  formatToBack() {
    return {
      players: Object.entries({ ...this.players }).map(([k, v]) => ({ ...v, id: k })),
      table: Object.values({ ...this.table }).filter((v) => v.isComplete()),
      trash: this.trash,
    };
  }

  /**
   * calcul des cartes non utilisées en soustrayant toute les carte sélectionnés et celles utilisées
   * @param cardDataBase base de toute les cartes sélectionn&es par l'utilisateur
   * @returns carte non utilisées mais présente
   */
  setTrash(cardDataBase: Card[]): Card[] {
    const { players, table } = this.formatToBack();

    const usedCard: Card[] = [
      ...Object.values(players).map((v) => [v.card1, v.card2].filter<Card>((v: Card | undefined): v is Card => v !== undefined)),
      table,
    ].flat<Card[][]>();
    return cardDataBase.filter((v) => !usedCard.map((w) => w.id).includes(v.id));
  }
}
