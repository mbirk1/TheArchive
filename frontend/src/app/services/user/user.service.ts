import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../api/user/user.store';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthStore } from '../../api/auth/auth.store';
import { IRegisterRequest } from 'lib';


@Injectable({ providedIn: 'root' })
export class UserService {
  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);

  public isUserLoggedIn(): boolean {
    return this.authStore.isAuthenticated();
  }

  getNumberOfUsers(): Observable<number> {
    return this.userStore.getNumberOfUsers();
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.userStore.getNumberOfTodaysActiveUsers();
  }

  createUser(user: IRegisterRequest) {
    const { userName, password, confirmPassword, email } = user;
    if (
      !userName?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim() ||
      !email?.trim()
    ) {
      return;
    }
    return firstValueFrom(
      this.userStore.createUser(user),
    );
  }

}
