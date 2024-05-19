import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
import { playerListConfiguration, headerHeight } from 'src/app/models/configurations';

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
  tableForm: FormGroup = new FormGroup({
    card1: new FormControl(),
    card2: new FormControl(),
    card3: new FormControl(),
    card4: new FormControl(),
    card5: new FormControl(),
  });
  /** constantes sur les cartes de joueur */
  playerList = playerListConfiguration;
  /** hauteur du header qui va servir au positionnement des colonnes */
  headerHeight = headerHeight;

  ngOnInit() {
    this.parentFormGroup.addControl('players', this.playersForm);
    this.parentFormGroup.addControl('table', this.tableForm);
  }
}
