import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFrameComponent } from './player-side-frame.component';

describe('SideFrameComponent', () => {
  let component: SideFrameComponent;
  let fixture: ComponentFixture<SideFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideFrameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
