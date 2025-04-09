import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, input } from '@angular/core';
import { Card } from 'src/app/models/card';
import { OutListComponent } from './out-list.component';

describe('OutListComponent', () => {
  let component: OutListComponent;
  let fixture: ComponentFixture<OutListComponent>;
  let componentRef: ComponentRef<OutListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  describe('cardsDisplayed', () => {
    it('should return all cards if the number of outs is less than or equal to maxCardsDisplayed', () => {
      component.maxCardsDisplayed = 5;
      componentRef.setInput('outsSig', [{ value: 3 }, { value: 1 }, { value: 2 }] as Card[]);

      const result = component.cardsDisplayed();

      expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('should return sorted cards up to maxCardsDisplayed if outs exceed maxCardsDisplayed', () => {
      component.maxCardsDisplayed = 3;
      componentRef.setInput('outsSig', [{ value: 5 }, { value: 2 }, { value: 4 }, { value: 1 }] as Card[]);

      const result = component.cardsDisplayed();

      expect(result).toEqual([{ value: 1 }, { value: 2 }]);
    });

    it('should return sorted cards up to maxCardsDisplayed when outs contain exactly maxCardsDisplayed cards', () => {
      component.maxCardsDisplayed = 3;
      componentRef.setInput('outsSig', [{ value: 3 }, { value: 1 }, { value: 2 }] as Card[]);

      const result = component.cardsDisplayed();

      expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('should handle an empty outs list', () => {
      component.maxCardsDisplayed = 3;
      componentRef.setInput('outsSig', [] as Card[]);

      const result = component.cardsDisplayed();

      expect(result).toEqual([]);
    });

    it('should correctly handle undefined values when sorting cards', () => {
      component.maxCardsDisplayed = 5;
      componentRef.setInput('outsSig', [{ value: undefined }, { value: 2 }, { value: undefined }, { value: 1 }] as Card[]);

      const result = component.cardsDisplayed();

      expect(result).toEqual([{ value: undefined }, { value: undefined }, { value: 1 }, { value: 2 }]);
    });
  });
  describe('cardOverflow', () => {
    it('should return false if outsSig has fewer cards than maxCardsDisplayed', () => {
      component.maxCardsDisplayed = 5;
      componentRef.setInput('outsSig', [{ value: 1 }, { value: 2 }, { value: 3 }] as Card[]);

      const result = component.cardOverflow();

      expect(result).toBeNull();
    });

    it('should return false if outsSig has exactly maxCardsDisplayed cards', () => {
      component.maxCardsDisplayed = 3;
      componentRef.setInput('outsSig', [{ value: 1 }, { value: 2 }, { value: 3 }] as Card[]);

      const result = component.cardOverflow();

      expect(result).toBeNull();
    });

    it('should return true if outsSig has more cards than maxCardsDisplayed', () => {
      component.maxCardsDisplayed = 3;
      componentRef.setInput('outsSig', [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }] as Card[]);

      const result = component.cardOverflow();

      expect(result).toBe(2);
    });
  });
});
