import { inject, Injectable } from '@angular/core';
import { CollectionStore } from '../../api/collection/collection.store';
import { ICard } from 'lib';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private collectionStore = inject(CollectionStore);

  getTotalCardsForUser(): number {
    if (this.collectionStore.collection()?.cards !== undefined) {
      return this.collectionStore.collection()?.cards.length ?? 0;
    }
    return 0;
  }

  getValueForAllCardsInCollection(): number {
    if (this.collectionStore.collection()?.cards !== undefined) {
      return this.collectionStore.collection()?.cards.reduce((sum, card) => {
        const value = card.prices.eur;
        if (typeof value !== 'number') return sum;
        return sum + value;
      }, 0);
    }
    return 0;
  }

  getAllCardsInCollection(): ICard[] {
    return this.collectionStore.collection()?.cards ?? [];
  }

  addCardToCollection(card: ICard) {
    this.collectionStore.addCardToCollection(card);
  }
}
