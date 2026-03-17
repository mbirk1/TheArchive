import { inject, ResourceRef, signal, WritableSignal } from '@angular/core';
import { CardsGateway } from './cards.gateway';
import { resource } from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ICard } from 'lib';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private cardGateway: CardsGateway = inject(CardsGateway);

  public cardId: WritableSignal<string> = signal('');

  private allCardsResource: ResourceRef<ICard[] | undefined> = resource({
    loader: (): Promise<ICard[]> =>
      firstValueFrom(this.cardGateway.getAllCards()),
  });

  private specificCardResource: ResourceRef<ICard | undefined> = resource({
    params: () => ({ id: this.cardId() }),
    loader: ({ params }) =>
      firstValueFrom(this.cardGateway.findById(params.id)),
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

  public specificCardValue(): ICard {
    const value = this.specificCardResource.value()!;
    console.log(value);
    return value;
  }
}
