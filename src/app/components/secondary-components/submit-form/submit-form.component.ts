import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { filter, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss',
})
export class SubmitFormComponent {
  /** provider de service de carte */
  cardS = inject(CardService);
  /** calcul des cartes dupliuées par rapport à toute les cartes */
  duplicatedCards$: Observable<Card[]> = this.cardS.cardDataBase$.pipe(
    map((v) => v.filter((w) => w != null && w.isComplete())),
    map((v) => this.getDuplicates(v)),
  );

  /**
   * algorithme d'isolation des doublons de la liste en paramètre
   * @param cards la liste a analysé
   */
  getDuplicates(cards: Card[]): Card[] {
    const seen = new Map<string, boolean>();
    const duplicates: Card[] = [];

    for (const item of cards) {
      const key = item.uniqueValue;

      if (seen.has(key)) {
        if (!seen.get(key)) {
          duplicates.push(item);
          seen.set(key, true);
        }
      } else {
        seen.set(key, false);
      }
    }
    return duplicates;
  }
}
