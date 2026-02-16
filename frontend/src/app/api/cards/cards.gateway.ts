import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';

@Injectable({ providedIn: 'root' })
export class CardsGateway {
  private http: HttpClient = inject(HttpClient);
  private configService: ConfigService = inject(ConfigService);

  getAllCards() {
    return this.http.get(this.configService.apiUrl + '/cards')
  }
}