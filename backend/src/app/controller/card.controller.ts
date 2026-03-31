import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { Card } from '../database/entities/card.entity';
import { firstValueFrom, of } from 'rxjs';

@Controller('cards')
export class CardController {
  @Inject()
  private cardService: CardService;

  @Get()
  public async getCards(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  public async getSpecificCard(@Param('id') id: string): Promise<Card> {
    return this.cardService.findSpecificCardById(id);
  }

  @Get('search/name=:query')
  public async searchByName(@Param('query') query: string): Promise<Card[]> {
    console.log(query);

    this.cardService.searchForCardsByName(query);

    return firstValueFrom(of());
  }
}
