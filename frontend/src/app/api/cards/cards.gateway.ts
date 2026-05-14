import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { ICard, PaginationResponse } from 'lib';
import { Observable } from 'rxjs';
import { Page } from '@playwright/test';

@Injectable({ providedIn: 'root' })
export class CardsGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getRandomCard(): Observable<ICard> {
    return this.http.get<ICard>(`${this.configService.apiUrl}/cards/random`);
  }

  getAmountOfCards(): Observable<number> {
    return this.http.get<number>(`${this.configService.apiUrl}/cards/amount`);
  }

  getPagedCards(limit: number, offset: number, textFilter: string): Observable<PaginationResponse<ICard>> {
    return this.http.get<PaginationResponse<ICard>>(`${this.configService.apiUrl}/cards?limit=${limit}&offset=${offset}&textFilter=${textFilter}`);
  }
}
