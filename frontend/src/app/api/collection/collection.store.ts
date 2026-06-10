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
    loader: (): Promise<ICollection | undefined> =>
      firstValueFrom(this.collectionGateway.getAllCardsInCollection(), { defaultValue: undefined }),
  });

  readonly isLoading: Signal<boolean> = computed(() => this.collectionResource.isLoading());
  readonly collection: Signal<ICollection> = computed(() => {
    console.log(this.collectionResource.error()?.cause)
    if (this.collectionResource.hasValue()) {
      console.log(this.collectionResource.error())
      return this.collectionResource.value();
    } else {

      return {} as ICollection;
    }
  });
}
