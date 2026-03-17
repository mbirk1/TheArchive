import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { Card } from '../database/entities/card.entity';

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
}
