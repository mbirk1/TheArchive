import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { ICard } from 'lib';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardsGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getAllCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>(this.configService.apiUrl + '/cards');
  }

  findById(id: string): Observable<ICard> {
    return this.http.get<ICard>(`${this.configService.apiUrl}/cards/${id}`);
  }
}
