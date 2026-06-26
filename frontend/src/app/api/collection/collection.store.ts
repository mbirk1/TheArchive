import {
  computed,
  inject,
  resource, ResourceRef,
  Signal
} from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CollectionGateway } from './collection.gateway';
import { ICard, ICollection } from 'lib';

@Injectable({ providedIn: 'root' })
export class CollectionStore {
  private collectionGateway: CollectionGateway = inject(CollectionGateway);

  private collectionResource: ResourceRef<ICollection | undefined> = resource({
    loader: (): Promise<ICollection | undefined> =>
      firstValueFrom(this.collectionGateway.findCollection(), { defaultValue: undefined }),
  });

  readonly isLoading: Signal<boolean> = computed(() => this.collectionResource.isLoading());
  readonly collection: Signal<ICollection> = computed(() => {
    if (this.collectionResource.hasValue()) {
      return this.collectionResource.value();
    }
      return {} as ICollection;
  });

  addCardToCollection(card: ICard) {
    this.collectionGateway.addCardToCollection(card).subscribe(response => {
      this.collectionResource.reload();
    });
  }

}
