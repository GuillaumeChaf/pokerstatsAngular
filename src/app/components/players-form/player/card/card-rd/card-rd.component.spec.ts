import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRdComponent } from './card-rd.component';

describe('CardRdComponent', () => {
  let component: CardRdComponent;
  let fixture: ComponentFixture<CardRdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
