import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeckGateway } from './deck.gateway';

@Injectable({ providedIn: 'root' })
export class DeckStore {
  private deckGateway: DeckGateway = inject(DeckGateway);

  getNumberOfDecks(): Observable<number> {
    return this.deckGateway.getNumberOfDecks();
  }
}
