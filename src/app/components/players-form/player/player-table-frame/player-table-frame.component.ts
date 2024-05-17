import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-table-frame',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './player-table-frame.component.html',
  styleUrl: './player-table-frame.component.scss',
})
export class PlayerTableFrameComponent {
  /** formulaire dans lequel sont inclut les champs */
  @Input() playerForm!: FormGroup;
}
