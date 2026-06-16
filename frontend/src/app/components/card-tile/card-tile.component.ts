import { Component, inject, input, InputSignal } from '@angular/core';
import { ICard } from 'lib';
import { CollectionService } from '../../services/collection/collection.service';
import { AuthStore } from '../../api/auth/auth.store';

@Component({
  imports: [],
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  standalone: true,
})
export class CardTileComponent {
  card: InputSignal<ICard> = input.required<ICard>();
  isInCollectionSection: InputSignal<boolean> = input.required<boolean>();

  collectionService: CollectionService = inject(CollectionService);
  authStore: AuthStore = inject(AuthStore);

  addCardToCollection() {
    this.collectionService.addCardToCollection(this.card())
  }
}
