import { CardsStore } from '../../api/cards/cards.store';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AllCardsService {
  private cardStore = inject(CardsStore);

  getAllCards() {
    return this.cardStore.allCards();
  }
}
