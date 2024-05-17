import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerSideFrameComponent } from './player-side-frame/player-side-frame.component';
import { PlayerTableFrameComponent } from './player-table-frame/player-table-frame.component';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [ReactiveFormsModule, PlayerSideFrameComponent, PlayerTableFrameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  /** information sur le joueur */
  @Input({ required: true }) player!: Player;

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  /** formulaire du joueur */
  form: FormGroup = new FormGroup({
    card1: new FormControl(),
    card2: new FormControl(),
    condition: new FormControl(),
    suit: new FormControl(),
  });

  ngOnInit() {
    this.parentFormGroup.addControl(this.player.id, this.form);
  }
}