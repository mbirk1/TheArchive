import {
  computed,
  effect,
  inject,
  resource,
  ResourceRef,
  Signal,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserGateway } from './user.gateway';
import { IRegisterRequest, IUser } from 'lib';
import { AuthStore } from '../auth/auth.store';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway);
  private authStore: AuthStore = inject(AuthStore);

  constructor() {}

  private userResource: ResourceRef<IUser | undefined> = resource({
    loader: (): Promise<IUser | undefined> => {
      if (!this.authStore.isAuthenticated()) {
        return Promise.resolve(undefined);
      }
      return firstValueFrom(this.userGateway.getMyUser());
    },
  });

  currentUser: Signal<IUser> = computed(() => {
    if (this.userResource.isLoading()) {
      throw new Error('User still loading');
    }
    const user: IUser | undefined = this.userResource.value();
    if (!user) {
      throw new Error('CurrentUser accessed before authentication');
    }
    return user;
  });

  isLoading(): boolean {
    return this.userResource.isLoading();
  }

  getMyUser(): Observable<IUser> {
    return this.userGateway.getMyUser();
  }
  getNumberOfUsers(): Observable<number> {
    return this.userGateway.getNumberOfUsers();
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.userGateway.getNumberOfTodaysActiveUsers();
  }

  createUser(user: IRegisterRequest): Observable<IUser> {
    return this.userGateway.createUser(user);
  }
}
