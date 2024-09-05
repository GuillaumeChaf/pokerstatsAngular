export enum Combination {
  Default = -1,
  HighCard = 0,
  Pair = 1,
  TwoPair = 2,
  Three_Of_A_Kind = 3,
  Quint = 4,
  Flush = 5,
  Full = 6,
  Square = 7,
  Quint_Flush = 8,
  Quint_Flush_Royal = 9,
}

export type combinationDPConfig = { value: Combination; label: string; order: number };

export const combinationDP: { [key: number]: combinationDPConfig } = {
  '-1': { value: Combination.Default, label: 'Toute', order: 0 },
  '0': { value: Combination.HighCard, label: 'Carte haute', order: 1 },
  '1': { value: Combination.Pair, label: 'Paire', order: 2 },
  '2': { value: Combination.TwoPair, label: 'Double paire', order: 3 },
  '3': { value: Combination.Three_Of_A_Kind, label: 'Brelan', order: 4 },
  '4': { value: Combination.Quint, label: 'Suite', order: 5 },
  '5': { value: Combination.Flush, label: 'Couleur', order: 6 },
  '6': { value: Combination.Full, label: 'Full', order: 7 },
  '7': { value: Combination.Square, label: 'Carré', order: 8 },
  '8': { value: Combination.Quint_Flush, label: 'Suite coloré', order: 9 },
  '9': { value: Combination.Quint_Flush_Royal, label: "Suite coloré à l'as", order: 10 },
};
