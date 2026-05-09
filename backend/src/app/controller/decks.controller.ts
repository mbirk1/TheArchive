import { Controller, Get, Inject } from '@nestjs/common';
import { IDeck } from 'lib';
import { DecksService } from '../services/decks.service';

@Controller('decks')
export class DecksController {
  @Inject()
  private decksServie: DecksService;

  @Get()
  public async getDecks(): Promise<IDeck[]> {
    return this.decksServie.findAll();
  }

  @Get('amount')
  public async getNumberOfDecks(): Promise<number> {
    return this.decksServie.getNumberOfDecks();
  }
}
