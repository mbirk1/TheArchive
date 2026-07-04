import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';
import { ICard, ICollection, PaginationResponse } from 'lib';
import { Observable } from 'rxjs';
import { Page } from '@playwright/test';
import { SKIP_AUTH } from '../auth/http.context';

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

  getPagedCards(
    limit: number,
    offset: number,
    textFilter: string,
    sortOrder?: 'ASC' | 'DESC',
  ): Observable<PaginationResponse<ICard>> {
    return this.http.get<PaginationResponse<ICard>>(
      `${this.configService.apiUrl}/cards?limit=${limit}&offset=${offset}&textFilter=${textFilter}&sortOrder=${sortOrder}`,
      {
        context: new HttpContext().set(SKIP_AUTH, true),
      },
    );
  }
}
