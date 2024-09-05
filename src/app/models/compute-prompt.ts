import { Card } from './card';
import { Player } from './player';

export class ComputePrompt {
  players?: { [key: number]: Player } = {};
  table?: { [key: string]: Card } = {};

  constructor(v?: ComputePrompt) {
    Object.assign(this, v);
  }

  formatToBack() {
    return {
      players: Object.entries({ ...this.players }).map(([k, v]) => ({ ...v, id: k })),
      table: Object.values({ ...this.table }).filter((v) => v.isComplete()),
    };
  }
}
