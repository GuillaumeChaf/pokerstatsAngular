import { Component, Input, OnDestroy, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerSideFrameComponent } from './player-side-frame/player-side-frame.component';
import { PlayerTableFrameComponent } from './player-table-frame/player-table-frame.component';
import { Card } from 'src/app/models/card';
import { conditions } from 'src/app/models/conditions';
import { PlayerConfiguration } from 'src/app/models/player-configurations';
import { Combination } from 'src/app/models/combinations';
import { PlayerOutsFrameComponent } from './player-outs-frame/player-outs-frame.component';
import { getPlayerValidator } from 'src/app/models/player';
import { FormErrorHandlerService } from 'src/app/services/form-error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [ReactiveFormsModule, PlayerSideFrameComponent, PlayerTableFrameComponent, PlayerOutsFrameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, OnDestroy {
  /** information sur le joueur */
  @Input({ required: true }) player!: PlayerConfiguration;
  /** injecteur du gestionnaire d'erreur */
  fehS = inject(FormErrorHandlerService);
  //#region récupération du formulaire parent
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  //#endregion
  /** formulaire du joueur */
  form!: FormGroup;
  /** état d'activation du joueur */
  activStateSig: WritableSignal<boolean> = signal(false);
  /** liste des conditions de statistiques */
  conditionsList = conditions;

  errorHandlerSubscription?: Subscription;

  constructor() {
    effect(
      () => {
        if (this.activStateSig()) {
          this.parentFormGroup.addControl(this.player.id, this.form);
          this.form.enable();
          this.errorHandlerSubscription = this.form.valueChanges.subscribe((v) =>
            this.fehS.updatePlayerErrors(this.player.id, this.form.errors ?? {}),
          );
          this.fehS.updatePlayerErrors(this.player.id, this.form.errors ?? {});
        } else {
          this.parentFormGroup.removeControl(this.player.id);
          this.form.disable();
          this.fehS.updatePlayerErrors(this.player.id, {});
          this.errorHandlerSubscription?.unsubscribe();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    this.activStateSig.set(this.player.defaultActiv);
    this.initForm();
  }

  /** initialisation du formulaire */
  initForm() {
    this.form = new FormGroup(
      {
        card1: new FormControl(new Card('P' + this.player.id + 'C1')),
        card2: new FormControl(new Card('P' + this.player.id + 'C2')),
        condition: new FormControl(this.conditionsList['win'].value),
        suit: new FormControl(Combination.Default),
      },
      [getPlayerValidator(this.player)],
    );
  }

  ngOnDestroy() {
    this.errorHandlerSubscription?.unsubscribe();
  }
}
