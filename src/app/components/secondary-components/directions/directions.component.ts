import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { conditions } from 'src/app/models/conditions';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.scss',
})
export class DirectionsComponent {
  /** liste des conditions */
  conditions = conditions;
  /** exte expliquant le principe d'ajout et suppression d'un joueur dans le coup */
  addDelLegend: string = 'Entrée/Sortie des joueurs dans le calcul de la main';
  /** texte explqiuant le principe de la sélection de carte */
  selectionCardLegend: string = 'Sélection des cartes, tous les joueurs dans le coup doivent avoir leur 2 cartes sélectionnées';
  /** texte expliquant le principe de condition de calcul */
  conditionLegend = 'Le pourcentage affiché sera la probabilité de ...';
  /** texte expliquant le principe des combinaisons finale */
  finalCombinationLegend: string = 'Probabilité octroyant en plus la <strong>CF</strong> au joueur';

  orderFnc: (a: KeyValue<string, any>, b: KeyValue<string, any>) => number = (a, b) => {
    return a.value.order - b.value.order;
  };
}
