import { CardsStore } from '../../api/cards/cards.store';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ICard } from 'lib';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardService {
  private cardStore = inject(CardsStore);

  getAllCards(): ICard[] {
    return this.cardStore.allCards();
  }

  findCardById(id: string): ICard {
    this.cardStore.cardId.set(id);
    return this.cardStore.specificCardValue();
  }
}
