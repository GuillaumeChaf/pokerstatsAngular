import { Component, Input, ModelSignal, Signal, computed, model } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerConfiguration } from 'src/app/models/player';

@Component({
  selector: 'app-player-table-frame',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './player-table-frame.component.html',
  styleUrls: ['../player.component.scss', './player-table-frame.component.scss'],
})
export class PlayerTableFrameComponent {
  /** formulaire dans lequel sont inclut les champs */
  @Input({ required: true }) playerForm!: FormGroup;
  /** information sur le joueur */
  @Input({ required: true }) conf!: PlayerConfiguration;
  /** ngModel qui va gérer l'activation du composant */
  activState: ModelSignal<boolean | undefined> = model<boolean>();
  /** chemin du svg du bouton d'activation */
  activBtnSvgSig: Signal<string> = computed(() => `assets/svg/activation-states/${this.activState() ? 'square-minus' : 'square-plus'}.svg#body`);
}
