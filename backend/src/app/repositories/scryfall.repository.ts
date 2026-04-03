import { Injectable } from '@nestjs/common';
import { ICard } from 'lib';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ScryfallRepository {
  constructor(private readonly httpService: HttpService) {
    this.auth();
  }

  private auth() {}

  searchByName(name: string) {}

  async randomCard(): Promise<ICard> {
    const randomCard = await firstValueFrom(
      this.httpService.get<ICard>('https://api.scryfall.com/cards/random'),
    );
    return randomCard.data;
  }
}
