import { inject, ResourceRef } from '@angular/core';
import { resource } from '@angular/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserGateway } from './user.gateway';
import { IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userGateway: UserGateway = inject(UserGateway);

  private userResource: ResourceRef<IUser | undefined> = resource({
    loader: (): Promise<IUser> => firstValueFrom(this.userGateway.getMyUser()),
  });
}
