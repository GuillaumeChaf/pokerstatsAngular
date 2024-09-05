export type condition = 'win' | 'finish' | 'lose';

export type conditionConfig = { value: string; color: string; viewBox: string; title: string; order: number };

export const conditions: { [key in condition]: conditionConfig } = {
  win: { value: 'win', color: '#2d972d', viewBox: '0 0 512 512', title: 'victoire', order: 0 },
  finish: { value: 'finish', color: '#db8546', viewBox: '0 0 448 576', title: 'obtention', order: 1 },
  lose: { value: 'lose', color: '#cf0000', viewBox: '0 0 448 512', title: 'défaite', order: 2 },
};
