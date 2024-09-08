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
  /** données secondaires */
  secondary: secondaryComputeData;

  get combinationsNbToString(): string {
    return this.numberFormated(this.secondary.combinations);
  }

  constructor({ players, split, secondary }: statsCallback) {
    for (const key in players) {
      const { stat, outs } = players[key];
      this.players[key] = {
        stat: stat,
        outs: outs?.map((v) => Card.createCard(v)) ?? [],
        statPerc: this.getStatperc(stat, secondary.combinations),
      };
    }
    this.split = {
      outs: split?.winSplitOuts?.map((v) => Card.createCard(v)) ?? [],
      stat: split.winSplit,
      statPerc: this.getStatperc(split.winSplit, secondary.combinations),
    };
    this.secondary = secondary;
  }

  getStatperc(n: number, total: number): string {
    return Math.round((n / total) * 10000) / 100 + ' %';
  }

  numberFormated(computationTime: number): string {
    const numberToArr: string[] = computationTime.toString().split('').reverse();
    const separate: string[] = [
      ...numberToArr.slice(6).reverse(),
      ' ',
      ...numberToArr.slice(3, 6).reverse(),
      ' ',
      ...numberToArr.slice(0, 3).reverse(),
    ];
    return separate.join('');
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
  secondary: secondaryComputeData;
};

export type secondaryComputeData = {
  /** nombre de combinaison totale calculée */
  combinations: number;
  /** temps de calcul en millisecondes */
  computationTime: number;
};

export type winSplit = {
  /** nombre de combinaison amenant au partage d'au moins 2 joueurs */
  winSplit: number;
  /** outs amenant à un partage entre au moins 2 joueurs */
  winSplitOuts: Card[];
};
