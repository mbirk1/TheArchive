import {
  computed,
  inject,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { resource } from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserGateway } from './user.gateway';
import { ICreateUserFormDataValue, IUser, IUserSignInFormDataValue } from 'lib';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway)
  private signInData: WritableSignal<IUserSignInFormDataValue | undefined> = signal(undefined);

  private signInResource: ResourceRef<IUser | undefined> = resource({
    params: () => this.signInData(),
    loader: ({ params }): Promise<IUser> => firstValueFrom(this.userGateway.signingInUser(params)),
  });

  readonly isLoggedIn: Signal<boolean> = computed(() => this.signInResource.value() !== undefined);

  getNumberOfUsers(): Observable<number> {
    return this.userGateway.getNumberOfUsers();
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.userGateway.getNumberOfTodaysActiveUsers();
  }

  createUser(user: ICreateUserFormDataValue): Observable<IUser> {
    return this.userGateway.createUser(user);
  }

  signingInUser(user: IUserSignInFormDataValue): void {
    return this.signInData.set(user);
  }
}
