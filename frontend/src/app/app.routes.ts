import { Route } from '@angular/router';
import { PersonalDecksComponent } from './pages/personal/decks/personal-decks.component';
import { PersonalCollectionComponent } from './pages/personal/collection/personal-collection.component';
import { PersonalProfileComponent } from './pages/personal/profile/personal-profile.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BrowseCardsComponent } from './pages/browse-cards/browse-cards.component';
import { SignUpInComponent } from './pages/sign-up/sign-up-in.component';
import {
  alreadyLoggedInGuard,
  notLoggedInGuard,
} from './guards/alreadyLoggedIn.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'browse',
    component: BrowseCardsComponent,
  },
  {
    path: 'cardDetail',
    component: CardDetailComponent,
  },
  {
    path: 'user',
    canActivate: [alreadyLoggedInGuard],
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
  {
    path: 'login',
    canActivate: [notLoggedInGuard],
    component: SignUpInComponent,
  },
];
