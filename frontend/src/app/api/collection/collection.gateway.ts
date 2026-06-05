import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { Observable } from 'rxjs';
import { ICollection, IRegisterRequest, IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class CollectionGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getAllCardsInCollection(): Observable<ICollection> {
    return this.http.get<ICollection>(
      `${this.configService.apiUrl}/collection`,
    );
  }
}
