import { inject, ResourceRef } from '@angular/core';
import { CardsGateway } from './cards.gateway';
import { resource } from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ICard } from 'lib';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private cardGateway: CardsGateway = inject(CardsGateway);

  private allCardsResource: ResourceRef<ICard[] | undefined> = resource({
    loader: (): Promise<ICard[]> =>
      firstValueFrom(this.cardGateway.getAllCards()),
  });

  public isLoading(): boolean {
    return this.allCardsResource.isLoading();
  }

  public allCards(): ICard[] {
    if (this.allCardsResource.hasValue()) {
      return this.allCardsResource.value();
    }
    return [];
  }
}
