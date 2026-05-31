import {
  inject,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from './user.gateway';
import { IRegisterRequest, IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway);

  constructor() {
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
