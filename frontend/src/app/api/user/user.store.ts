import { inject, ResourceRef } from '@angular/core';
import { resource } from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserGateway } from './user.gateway';
import { IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway);

  private userResource: ResourceRef<IUser | undefined> = resource({
    loader: (): Promise<IUser> => firstValueFrom(this.userGateway.getMyUser()),
  });

  isLoggedIn(): boolean {
    //TODO LoginLogic must be implemented. OAuth2, Discord or smth like that
    return false;
  }

  getNumberOfUsers(): Observable<number> {
    return this.userGateway.getNumberOfUsers();
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.userGateway.getNumberOfTodaysActiveUsers();
  }
}
