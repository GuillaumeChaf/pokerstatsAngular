import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
import { headerHeight, playerListConfiguration } from 'src/app/models/player-configurations';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-players-form',
  standalone: true,
  imports: [ReactiveFormsModule, PlayerComponent, TableComponent],
  templateUrl: './players-form.component.html',
  styleUrl: './players-form.component.scss',
})
export class PlayersFormComponent {
  //#region récupération du formulaire parent
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  //#endregion
  /** données provenant de tous les joueurs sous forme de formulaire */
  playersForm: FormGroup = new FormGroup({});
  /** données provenant de la table */
  tableForm!: FormGroup;
  /** constantes sur les cartes de joueur */
  playerList = playerListConfiguration;
  /** hauteur du header qui va servir au positionnement des colonnes */
  headerHeight = headerHeight;

  ngOnInit() {
    this.initForm();
    this.parentFormGroup.addControl('players', this.playersForm);
    this.parentFormGroup.addControl('table', this.tableForm);
  }

  /** initialisation du formulaire */
  initForm() {
    this.tableForm = new FormGroup({
      card1: new FormControl(new Card('TC1')),
      card2: new FormControl(new Card('TC2')),
      card3: new FormControl(new Card('TC3')),
      card4: new FormControl(new Card('TC4')),
      card5: new FormControl(new Card('TC5')),
    });
  }
}
