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
  protected collectionService: CollectionService = inject(CollectionService);
  protected userService: UserService = inject(UserService);

  protected user: Signal<IUser> = computed(() => this.userService.getMyUser());
  protected estValue: Signal<number> = this.collectionService.totalCollectionValue;

  protected totalCardsForUser: number =
    this.collectionService.getTotalCardsForUser();
}
