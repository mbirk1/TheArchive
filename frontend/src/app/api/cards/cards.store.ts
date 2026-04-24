import {
  inject,
  Injectable,
} from '@angular/core';
import { CardsGateway } from './cards.gateway';
import { ICard } from 'lib';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private cardGateway: CardsGateway = inject(CardsGateway);

  getRandomCard(): Observable<ICard> {
    return this.cardGateway.getRandomCard();
  }

  getAmountOfCards(): Observable<number> {
    return this.cardGateway.getAmountOfCards()
  }
}
