import { CardsStore } from '../../api/cards/cards.store';
import { inject, Injectable } from '@angular/core';
import { ICard, PaginationResponse } from 'lib';
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

  getPagedCards(): PaginationResponse<ICard> {
    return this.cardStore.cards();
  }

  setLimitOffset(limit: number, offset: number) {
    this.cardStore.setPage(limit, offset);
  }

  setLimit(limit: number): void {
    this.cardStore.setLimit(limit);
  }

  setOffset(offset: number): void {
    this.cardStore.setOffset(offset);
  }

  setTextFilter(textValue: string): void {
    this.cardStore.setTextFilter(textValue);
  }

  setSortOrder(sortOrder: string): void {
    this.cardStore.setSortOrder(sortOrder);
  }
}
