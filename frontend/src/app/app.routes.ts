import { Route } from '@angular/router';
import { AllCardsComponent } from './pages/all-cards/all-cards.component';
import { PersonalDecksComponent } from './pages/personal/decks/personal-decks.component';
import { PersonalCollectionComponent } from './pages/personal/collection/personal-collection.component';
import { PersonalProfileComponent } from './pages/personal/profile/personal-profile.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AllCardsComponent,
  },
  {
    path: 'user',
    children: [
      {
        path: 'decks',
        component: PersonalDecksComponent,
      },
      {
        path: 'collection',
        component: PersonalCollectionComponent,
      },
      {
        path: 'profile',
        component: PersonalProfileComponent,
      },
    ],
  },
];
