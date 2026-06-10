import { Component, inject } from '@angular/core';
import { HeroProfileHeaderComponent } from '../../../components/hero-profile-header/hero-profile-header.component';
import { CardTileComponent } from '../../../components/card-tile/card-tile.component';
import { CollectionService } from '../../../services/collection/collection.service';

@Component({
  imports: [HeroProfileHeaderComponent, CardTileComponent],
  selector: 'app-personal-collection',
  templateUrl: './personal-collection.component.html',
  standalone: true,
})
export class PersonalCollectionComponent {
  protected collectionService = inject(CollectionService);
}
