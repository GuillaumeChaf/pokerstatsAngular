import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CardService } from './card.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Card } from '../models/card';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorHandlerService {
  /** provider du service de carte */
  private _cardS = inject(CardService);

  //#region erreur lié à la duplication de carte
  duplicatedCardsSig: Signal<Card[]> = computed(() => {
    const cards = this._cardS.cardDataBaseSig().filter((w) => w != null && w.isComplete());
    return this.getDuplicates(cards);
  });

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
  //#endregion
  //#region liés aux cartes manquante chez des joueurs actifs
  // missingCardsDataBase$ = new BehaviorSubject<ValidationErrors>({});
  missingCardsDataBaseSig: WritableSignal<ValidationErrors> = signal({});

  /**
   * modification des erreurs de carte manquante lié à un joueur
   * @param idPlayer id du joueur concerné
   * @param errors les nouvelles erreurs à enregistrer
   */
  updatePlayerErrors(idPlayer: string, errors: ValidationErrors) {
    this.missingCardsDataBaseSig.update((v) => {
      delete v[`${idPlayer}_C1`];
      delete v[`${idPlayer}_C2`];
      return { ...v, ...errors };
    });
  }
  //#endregion
}
