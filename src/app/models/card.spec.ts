import { Card, Symbol } from './card';

describe('Card', () => {
  let usualCard: Card;

  beforeEach(() => {
    usualCard = new Card();
    usualCard.symbol = Symbol.Heart;
    usualCard.value = 10;
    usualCard.id = '123';
  });

  it('should correctly identify a complete card', () => {
    expect(usualCard.isComplete()).toBe(true);
  });

  it('should correctly identify an incomplete card', () => {
    usualCard.symbol = undefined;
    expect(usualCard.isComplete()).toBe(false);
  });

  it('should generate the correct uniqueValue', () => {
    expect(usualCard.uniqueValue).toBe('S1V10');
  });

  it('should create a new reference with the same properties using newRef', () => {
    const newCard = usualCard.newRef();
    expect(newCard).not.toBe(usualCard); // Ensure it's a new reference
    expect(newCard).toEqual(usualCard); // Ensure properties are the same
  });

  it('should create a new card with the same properties using createCard', () => {
    const newCard = Card.createCard(usualCard);
    expect(newCard).not.toBe(usualCard); // Ensure it's a new reference
    expect(newCard).toEqual(usualCard); // Ensure properties are the same
  });

  it('should not affect the original card when modifying the new card created by createCard', () => {
    const newCard = Card.createCard(usualCard);
    newCard.symbol = Symbol.Spade;
    newCard.value = 5;

    expect(newCard.symbol).toBe(Symbol.Spade);
    expect(newCard.value).toBe(5);

    // Ensure the original card remains unchanged
    expect(usualCard.symbol).toBe(Symbol.Heart);
    expect(usualCard.value).toBe(10);
  });
});
