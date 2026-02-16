import { inject } from '@angular/core';
import { CardsGateway } from './cards.gateway';
import {resource} from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private cardGateway = inject(CardsGateway);

  private allCardsResource = resource({
    loader: () => firstValueFrom(this.cardGateway.getAllCards())
  })

  public isLoading(): boolean {
    return this.allCardsResource.isLoading();
  }

  public allCards() {
    return this.allCardsResource.value();
  }
}