import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { Card } from '../database/entities/card.entity';
import { firstValueFrom, of } from 'rxjs';
import { ICard, PaginationDto, PaginationResponse } from 'lib';

@Controller('cards')
export class CardController {
  @Inject()
  private cardService: CardService;

  @Get()
  public async getCards(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Card>> {
    return this.cardService.findAll(paginationDto);
  }

  @Get('id=:id')
  public async getSpecificCard(@Param('id') id: string): Promise<Card> {
    return this.cardService.findSpecificCardById(id);
  }

  @Get('search/name=:query')
  public async searchByName(@Param('query') query: string): Promise<Card[]> {
    console.log(query);

    this.cardService.searchForCardsByName(query);

    return firstValueFrom(of());
  }

  @Get('amount')
  public async getAmountOfCards(): Promise<number> {
    return this.cardService.getAmountOfCards();
  }

  @Get('random')
  public async randomCard(): Promise<ICard> {
    return this.cardService.getRandomCard();
  }
}
