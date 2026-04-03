import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeckGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getNumberOfDecks(): Observable<number> {
    return this.http.get<number>(this.configService.apiUrl + '/decks/amount');
  }
}
