import {
  computed,
  effect,
  inject,
  Resource,
  resource,
  ResourceRef,
  Signal,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CollectionGateway } from './collection.gateway';
import { ICollection, IRegisterRequest, IUser } from 'lib';
import { AuthStore } from '../auth/auth.store';

@Injectable({ providedIn: 'root' })
export class CollectionStore {
  private collectionGateway: CollectionGateway = inject(CollectionGateway);

  constructor() {
    /* empty */
  }

  private collectionResource: Resource<ICollection | undefined> = resource({
    loader: (): Promise<ICollection> =>
      firstValueFrom(this.collectionGateway.getAllCardsInCollection()),
  });

  readonly count = computed(() => this.collectionResource.value() ?? 0);
  readonly isLoading = computed(() => this.collectionResource.isLoading());
  readonly collection = computed(() => {
    if (this.collectionResource.hasValue()) {
      return this.collectionResource.value();
    } else {
      return {} as ICollection;
    }
  });
}
