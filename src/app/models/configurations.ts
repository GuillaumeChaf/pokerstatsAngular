import { PlayerConfiguration } from './player';

export const playerListConfiguration: { [key: string]: PlayerConfiguration } = {
  1: new PlayerConfiguration({
    id: '1',
    bottom: 485,
    left: 321,
  }),
  2: new PlayerConfiguration({
    id: '2',
    bottom: 310,
    left: 160,
  }),
  3: new PlayerConfiguration({
    id: '3',
    bottom: 111,
    left: 160,
  }),
  4: new PlayerConfiguration({
    id: '4',
    bottom: 23,
    left: 381,
  }),
  5: new PlayerConfiguration({
    id: '5',
    bottom: 23,
    left: 687,
  }),
  6: new PlayerConfiguration({
    id: '6',
    bottom: 111,
    left: 923,
  }),
  7: new PlayerConfiguration({
    id: '7',
    bottom: 310,
    left: 923,
  }),
  8: new PlayerConfiguration({
    id: '8',
    bottom: 485,
    left: 775,
  }),
};

export const headerHeight = 75;
