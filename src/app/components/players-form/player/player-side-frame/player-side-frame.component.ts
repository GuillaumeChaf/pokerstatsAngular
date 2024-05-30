import { Component, Input, ModelSignal, Signal, computed, model } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combinationList } from 'src/app/models/combinations';
import { PlayerConfiguration } from 'src/app/models/player';

@Component({
  selector: 'app-player-side-frame',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-side-frame.component.html',
  styleUrls: ['../player.component.scss', './player-side-frame.component.scss'],
})
export class PlayerSideFrameComponent {
  /** formulaire dans lequel sont inclut les champs */
  @Input({ required: true }) playerForm!: FormGroup;
  /** information sur le joueur */
  @Input({ required: true }) conf!: PlayerConfiguration;
  /** ngModel qui va gérer l'activation du composant */
  activState: ModelSignal<boolean | undefined> = model<boolean>();
  /** chemin du svg du bouton d'activation */
  activBtnSvgSig: Signal<string> = computed(() => `assets/svg/activation-states/${this.activState() ? 'square-minus' : 'square-plus'}.svg#body`);
  /**   liste de combinaisons */
  combinationList = combinationList;
}
