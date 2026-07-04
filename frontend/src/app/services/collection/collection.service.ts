import { computed, inject, Injectable } from '@angular/core';
import { CollectionStore } from '../../api/collection/collection.store';
import { ICard } from 'lib';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private collectionStore = inject(CollectionStore);

  readonly totalCollectionValue = computed(() => {
    const cards: ICard[] = this.collectionStore.collection()?.cards;
    if (!cards?.length) return 0;

    return cards.reduce((sum, card) => {
      const value: string | null = card.prices?.eur;
      if (!value) return sum;

      return sum + +value;
    }, 0);
  });

  public isCollectionLoading(): boolean {
    return this.collectionStore.isLoading();
  }

  getTotalCardsForUser(): number {
    if (this.collectionStore.collection()?.cards !== undefined) {
      return this.collectionStore.collection()?.cards.length ?? 0;
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
