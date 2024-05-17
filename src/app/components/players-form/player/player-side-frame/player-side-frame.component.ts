import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-side-frame',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-side-frame.component.html',
  styleUrl: './player-side-frame.component.scss',
})
export class PlayerSideFrameComponent {
  /** formulaire dans lequel sont inclut les champs */
  @Input({ required: true }) playerForm!: FormGroup;

  @Output() close: EventEmitter<null> = new EventEmitter<null>();

  onClose() {
    this.close.emit(null);
  }
}
