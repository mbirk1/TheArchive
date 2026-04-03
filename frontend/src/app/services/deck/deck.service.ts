import { inject, Injectable } from '@angular/core';
import { DeckStore } from '../../api/deck/deck.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private deckStore = inject(DeckStore);

  getNumberOfDecks(): Observable<number> {
    return this.deckStore.getNumberOfDecks();
  }
}
