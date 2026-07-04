import {
  computed,
  effect,
  inject,
  resource,
  ResourceRef,
  Signal,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, NotFoundError, Observable } from 'rxjs';
import { UserGateway } from './user.gateway';
import { IRegisterRequest, IUser } from 'lib';
import { AuthStore } from '../auth/auth.store';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway);
  private authStore: AuthStore = inject(AuthStore);

  private userResource: ResourceRef<IUser | undefined> = resource({
    loader: (): Promise<IUser | undefined> => {
      if (!this.authStore.isAuthenticated()) {
        return Promise.resolve(undefined);
      }
      return firstValueFrom(this.userGateway.getMyUser(), {
        defaultValue: undefined,
      });
    },
  });

  currentUser: Signal<IUser> = computed(() => {
    if (this.userResource.isLoading()) {
      throw new Error('User still loading');
    }
    if (this.userResource.hasValue()) {
      return this.userResource.value();
    }
    return {} as IUser;
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
