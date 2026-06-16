import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { Observable } from 'rxjs';
import { ICard, ICollection, IRegisterRequest, IUser } from 'lib';

@Injectable({ providedIn: 'root' })
export class CollectionGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  findCollection(): Observable<ICollection> {
    return this.http.get<ICollection>(
      `${this.configService.apiUrl}/collection`,
    );
  }

  addCardToCollection(card: ICard): Observable<ICollection> {
    return this.http.post<ICollection>(`${this.configService.apiUrl}/collection/card`, card);
  }
}
