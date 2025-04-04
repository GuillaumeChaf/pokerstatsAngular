import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardRdComponent } from './card-rd.component';
import { ComponentRef } from '@angular/core';
import { Card, Symbol } from 'src/app/models/card';

describe('TestTestComponent', () => {
  let component: CardRdComponent;
  let fixture: ComponentFixture<CardRdComponent>;
  let componentRef: ComponentRef<CardRdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRdComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    const mock = Object.assign(new Card(), {
      symbol: Symbol.Club,
      value: 5,
    });
    componentRef.setInput('card', mock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('testing of different signals', () => {
    it('should update ngMSymbolConfig when card is change', () => {
      expect(component.ngMSymbolConfig()?.svgPath).toBe('club');
      expect(fixture.nativeElement.querySelector('svg').style.color).toBe('black');
    });
    it('should update ngMValueConfig when card is change', () => {
      expect(component.ngMValueConfig()).toEqual({ label: '5', value: 5 });
      expect(fixture.nativeElement.querySelector('h6').textContent).toBe('5');
    });
  });
});
