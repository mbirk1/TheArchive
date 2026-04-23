import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../api/user/user.store';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ICreateUserFormData,
  ICreateUserFormDataValue,
  IUser,
  IUserSignInFormData,
  IUserSignInFormDataValue
} from 'lib';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userStore = inject(UserStore);

  public isUserLoggedIn(): boolean {
    return this.userStore.isLoggedIn();
  }

  getNumberOfUsers(): Observable<number> {
    return this.userStore.getNumberOfUsers();
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.userStore.getNumberOfTodaysActiveUsers();
  }

  createUser(user: Partial<ICreateUserFormDataValue>) {
    const { userName, password, confirmPassword, eMail } = user;

    if (!userName?.trim() || !password?.trim() || !confirmPassword?.trim() || !eMail?.trim()) {
      return;
    }

    return firstValueFrom(this.userStore.createUser(user as ICreateUserFormDataValue));
  }

  signingInUser(user: Partial<ICreateUserFormDataValue>): void {
    this.userStore.signingInUser(user as IUserSignInFormDataValue);
  }
}
