import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { Observable } from 'rxjs';
import { IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class UserGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getMyUser(): Observable<IUser> {
    return this.http.get<IUser>(this.configService.apiUrl + '/user/me');
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(this.configService.apiUrl + '/user/amount');
  }

  getNumberOfTodaysActiveUsers(): Observable<number> {
    return this.http.get<number>(this.configService.apiUrl + '/user/today');
  }
}
