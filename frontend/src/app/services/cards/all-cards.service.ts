import { CardsStore } from '../../api/cards/cards.store';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ICard } from 'lib';

@Injectable({ providedIn: 'root' })
export class AllCardsService {
  private cardStore = inject(CardsStore);

  getAllCards(): ICard[] {
    return this.cardStore.allCards();
  }
}
