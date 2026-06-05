import { Component, computed, inject, Signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from 'lib';
import { CollectionService } from '../../services/collection/collection.service';

@Component({
  imports: [],
  selector: 'app-hero-profile-header',
  templateUrl: './hero-profile-header.component.html',
  standalone: true,
})
export class HeroProfileHeaderComponent {
  private collectionService = inject(CollectionService);
  protected userService = inject(UserService);

  protected user: Signal<IUser> = computed(() => this.userService.getMyUser());
  protected totalCardsForUser: number =
    this.collectionService.getTotalCardsForUser();

  //estValue: number = this.collectionService.getValueForAllCardsInCollection();
}
