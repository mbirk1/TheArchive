import {
  inject,
  Injectable,
  resource,
  ResourceRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { CardsGateway } from './cards.gateway';
import { firstValueFrom } from 'rxjs';
import { ICard } from 'lib';
import { Observable } from 'rxjs';

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

  isLoading(): boolean {
    return this.allCardsResource.isLoading();
  }

  allCards(): ICard[] {
    if (this.allCardsResource.hasValue()) {
      return this.allCardsResource.value();
    }
    return [];
  }

  specificCardValue(): ICard {
    return this.specificCardResource.value()!;
  }

  getRandomCard(): Observable<ICard> {
    return this.cardGateway.getRandomCard();
  }
}
