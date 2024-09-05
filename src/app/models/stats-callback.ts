import { Card } from './card';

export default class StatForm {
  /** objet de retour concernant les résultats calculés des joueurs  */
  players: { [key: string]: { stat: number; outs: Card[]; statPerc: string } } = {};
  /** objet de retour concernant le splitting des résultats */
  split: {
    outs: Card[];
    stat: number;
    statPerc: string;
  };

  constructor({ players, split, combinations }: statsCallback) {
    for (const key in players) {
      const { stat, outs } = players[key];
      this.players[key] = {
        stat: stat,
        outs: outs?.map((v) => Card.createCard(v)) ?? [],
        statPerc: this.getStatperc(stat, combinations),
      };
    }
    this.split = {
      outs: split?.winSplitOuts?.map((v) => Card.createCard(v)) ?? [],
      stat: split.winSplit,
      statPerc: this.getStatperc(split.winSplit, combinations),
    };
  }

  getStatperc(n: number, total: number): string {
    return Math.round((n / total) * 10000) / 100 + ' %';
  }
}

export class playerStat {
  /** nombre de main gagné */
  stat!: number;
  /** outs pour gagner */
  outs!: Card[];
  /** nombre de main gagné en pourcentage */
  statPerc!: number;
}

export type statsCallback = {
  /** différents joueurs impliqué et leur statistique de condition et outs respectif*/
  players: { [key: string]: { stat: number; outs: Card[] } };
  /** résultat concernant la victoire partagé */
  split: winSplit;
  /** nombre de combinaison totale calculée */
  combinations: number;
};

export type winSplit = {
  /** nombre de combinaison amenant au partage d'au moins 2 joueurs */
  winSplit: number;
  /** outs amenant à un partage entre au moins 2 joueurs */
  winSplitOuts: Card[];
};
