import { PlayerConfiguration } from './player';

export const playerListConfiguration: { [key: string]: PlayerConfiguration } = {
  1: new PlayerConfiguration({
    id: '1',
    name: 'Mike',
    bottom: 485,
    left: 321,
    cardsLeft: 0,
    cardsBottom: -195,
  }),
  2: new PlayerConfiguration({
    id: '2',
    name: 'Phil',
    bottom: 310,
    left: 160,
    cardsLeft: 0,
    cardsBottom: 115,
  }),
  3: new PlayerConfiguration({
    id: '3',
    name: 'Antonio',
    bottom: 91,
    left: 160,
    cardsLeft: 0,
    cardsBottom: 115,
  }),
  4: new PlayerConfiguration({
    id: '4',
    name: 'Tom',
    bottom: 23,
    left: 401,
    cardsLeft: 0,
    cardsBottom: 115,
  }),
  5: new PlayerConfiguration({
    id: '5',
    name: 'Daniel',
    bottom: 23,
    left: 667,
    cardsLeft: -93,
    cardsBottom: 115,
  }),
  6: new PlayerConfiguration({
    id: '6',
    name: 'Gus',
    bottom: 91,
    left: 923,
    cardsLeft: -93,
    cardsBottom: 115,
  }),
  7: new PlayerConfiguration({
    id: '7',
    name: 'Vanessa',
    bottom: 310,
    left: 923,
    cardsLeft: -93,
    cardsBottom: 115,
  }),
  8: new PlayerConfiguration({
    id: '8',
    name: 'Doyle',
    bottom: 485,
    left: 760,
    cardsLeft: -93,
    cardsBottom: -195,
  }),
};

export const headerHeight = 75;
