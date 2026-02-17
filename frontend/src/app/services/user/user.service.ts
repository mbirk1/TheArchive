import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../api/user/user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userStore = inject(UserStore);
}
