import { CardsStore } from '../../api/cards/cards.store';
import { inject, Injectable } from '@angular/core';
import { ICard } from 'lib';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardService {
  private cardStore = inject(CardsStore);

  getRandomCard(): Observable<ICard> {
    return this.cardStore.getRandomCard();
  }

  getAmountOfCards(): Observable<number> {
    return this.cardStore.getAmountOfCards();
  }
}
