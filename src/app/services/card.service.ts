import { Injectable, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
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

  changeStatePopUp(container: ViewContainerRef, template: TemplateRef<any>) {
    this.displayedViewRef?.destroy();
    if (this.displayedTemplate === template) {
      this.displayedTemplate = undefined;
    } else {
      this.displayedTemplate = template;
      this.displayedViewRef = container.createEmbeddedView(template);
    }
  }
  //#endregion

  //#region gestion des doublons de carte
  cardDataBase: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  //#endregion
}
