import { AsyncPipe } from '@angular/common';
import { Component, computed, input, Input, InputSignal, Signal } from '@angular/core';
import { PlayerConfiguration } from 'src/app/models/player-configurations';
import { CardRdComponent } from '../card/card-rd/card-rd.component';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-player-outs-frame',
  standalone: true,
  imports: [CardRdComponent, AsyncPipe],
  templateUrl: './player-outs-frame.component.html',
  styleUrls: ['./player-outs-frame.component.scss', '../card/card-rd/card-rd.component.scss'],
})
export class PlayerOutsFrameComponent {
  /** information sur le joueur */
  @Input({ required: true }) conf!: PlayerConfiguration;
  /** liste des outs à afficher */
  outs: InputSignal<Card[]> = input<Card[]>([]);
  /** nombre de carte maximum affiché */
  maxCardsDisplayed: number = 8;

  /** liste des cartes affichés */
  cardsDisplayed: Signal<Card[]> = computed(() => {
    const cards = this.outs().sort((a: Card, b: Card) => (a.value ?? 0) - (b.value ?? 0));
    return cards.length > this.maxCardsDisplayed ? [...cards.slice(0, 7)] : cards;
  });
  /** le surplu de carte à afficher, null s'il n'est pas nécéssaire */
  cardOverflow: Signal<number | null> = computed(() =>
    this.outs().length > this.maxCardsDisplayed ? this.outs().length - this.maxCardsDisplayed + 1 : null,
  );
}
