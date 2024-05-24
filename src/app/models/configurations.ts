import { PlayerConfiguration } from './player';

export const playerListConfiguration: { [key: string]: PlayerConfiguration } = {
  1: new PlayerConfiguration({
    id: '1',
    name: 'Mike',
    bottom: 485,
    left: 321,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  2: new PlayerConfiguration({
    id: '2',
    name: 'Phil',
    bottom: 310,
    left: 160,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  3: new PlayerConfiguration({
    id: '3',
    name: 'Antonio',
    bottom: 111,
    left: 160,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  4: new PlayerConfiguration({
    id: '4',
    name: 'Tom',
    bottom: 23,
    left: 381,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  5: new PlayerConfiguration({
    id: '5',
    name: 'Daniel',
    bottom: 23,
    left: 687,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  6: new PlayerConfiguration({
    id: '6',
    name: 'Gus',
    bottom: 111,
    left: 923,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  7: new PlayerConfiguration({
    id: '7',
    name: 'Vanessa',
    bottom: 310,
    left: 923,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
  8: new PlayerConfiguration({
    id: '8',
    name: 'Doyle',
    bottom: 485,
    left: 775,
    cardsLeft: 60,
    cardsBottom: 60,
  }),
};

export const headerHeight = 75;
