import {
  computed,
  inject,
  Injectable,
  resource, ResourceRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { CardsGateway } from './cards.gateway';
import { ICard, PaginationResponse } from 'lib';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private cardGateway: CardsGateway = inject(CardsGateway);
  private limit: WritableSignal<number> = signal(20);
  private offset: WritableSignal<number> = signal(0);
  private textFilter: WritableSignal<string> = signal('');

  #cardsResource: ResourceRef<PaginationResponse<ICard> | undefined> =  resource({
    params: () => ({ limit: this.limit(), offset: this.offset(), textFilter: this.textFilter() }),
    loader: async ({ params }): Promise<PaginationResponse<ICard>> => {
      return await firstValueFrom(this.cardGateway.getPagedCards(params.limit, params.offset, params.textFilter));
    },
  });

  getRandomCard(): Observable<ICard> {
    return this.cardGateway.getRandomCard();
  }

  getAmountOfCards(): Observable<number> {
    return this.cardGateway.getAmountOfCards();
  }

  cards: Signal<PaginationResponse<ICard>> = computed((): PaginationResponse<ICard> => this.#cardsResource.value() || {
    data: [],
    total: 0,
    limit: 0,
    offset: 0,
    nextPage: 0
  });
  isLoading: Signal<boolean> = computed((): boolean => this.#cardsResource.isLoading());
  total: Signal<number> = computed((): number => this.#cardsResource.value()?.total ?? 0);


  setPage(limit: number, offset: number): void {
    this.limit.set(limit);
    this.offset.set(offset);
  }

  setLimit(limit: number): void {
    this.limit.set(limit);
  }

  setOffset(offset: number): void {
    this.offset.set(offset);
  }

  setTextFilter(textFilter: string): void {
    this.textFilter.set(textFilter);
  }
}
