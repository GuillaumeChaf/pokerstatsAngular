import { Injectable, signal, TemplateRef, ViewContainerRef, ViewRef, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  //#region gestion de la popUp unique de pick de carte
  /** template actuellement affiché */
  displayedTemplate?: TemplateRef<any>;
  /** référence ou dernière référence de la vue affiché */
  displayedViewRef?: ViewRef;

  /**
   * création/suppression de la popUp de pick de carte
   * @param container container parent de la popUp
   * @param template template de la popUp
   */
  changeStatePopUp(container?: ViewContainerRef, template?: TemplateRef<any>) {
    this.displayedViewRef?.destroy();
    if (this.displayedTemplate === template || template == null) {
      this.displayedTemplate = undefined;
    } else {
      this.displayedTemplate = template;
      this.displayedViewRef = container?.createEmbeddedView(template);
    }
  }
  //#endregion

  //#region gestion des doublons de carte
  /** enregistrement des cartes sélectionnés par l'utilisateur */
  cardDataBaseSig: WritableSignal<Card[]> = signal<Card[]>([]);

  /** enregistrement d'une nouvelle carte dans la base */
  registerNewCard(card: Card): Card {
    const newCard = card.newRef();
    this.cardDataBaseSig.update((v) => [...v.filter((w) => w.id !== newCard.id), newCard]);
    return newCard;
  }

  //#endregion
}
