import { AsyncPipe } from '@angular/common';
import { Component, computed, input, Input, InputSignal, Signal } from '@angular/core';
import { CardRdComponent } from '../card-rd/card-rd.component';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'out-list',
  standalone: true,
  imports: [CardRdComponent, AsyncPipe],
  templateUrl: './out-list.component.html',
  styleUrls: ['./out-list.component.scss', '../card-rd/card-rd.component.scss'],
})
export class OutListComponent {
  /** nombre de carte maximum affiché */
  @Input() maxCardsDisplayed: number = 8;
  /** liste des outs à afficher */
  outsSig: InputSignal<Card[]> = input<Card[]>([]);

  /** liste des cartes affichés */
  cardsDisplayed: Signal<Card[]> = computed(() => {
    const cards = this.outsSig().sort((a: Card, b: Card) => (a.value ?? 0) - (b.value ?? 0));
    return cards.length > this.maxCardsDisplayed ? [...cards.slice(0, this.maxCardsDisplayed - 1)] : cards;
  });
  /** le surplu de carte à afficher, null s'il n'est pas nécéssaire */
  cardOverflow: Signal<number | null> = computed(() =>
    this.outsSig().length > this.maxCardsDisplayed ? this.outsSig().length - this.maxCardsDisplayed + 1 : null,
  );
}
