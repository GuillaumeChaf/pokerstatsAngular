import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTableFrameComponent } from './player-table-frame.component';

describe('PlayerTableFrameComponent', () => {
  let component: PlayerTableFrameComponent;
  let fixture: ComponentFixture<PlayerTableFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTableFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerTableFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
