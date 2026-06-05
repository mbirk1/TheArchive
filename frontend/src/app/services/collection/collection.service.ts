import { inject, Injectable } from '@angular/core';
import { CollectionStore } from '../../api/collection/collection.store';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private collectionStore = inject(CollectionStore);

  getTotalCardsForUser(): number {
    if (this.collectionStore.collection()?.cards !== undefined) {
      return this.collectionStore.collection()?.cards.length ?? 0;
    }
    return 0;
  }
}
