import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOutsFrameComponent } from './player-outs-frame.component';

describe('PlayerOutsFrameComponent', () => {
  let component: PlayerOutsFrameComponent;
  let fixture: ComponentFixture<PlayerOutsFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerOutsFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerOutsFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
