import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../api/user/user.store';
import { Observable } from 'rxjs';

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
}
