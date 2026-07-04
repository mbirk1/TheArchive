import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';
import { Card } from '../database/entities/card.entity';
import { ICollection } from 'lib';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get()
  getNumberOfCardsInCollection(
    @Headers() headers: Record<string, string>,
  ): Promise<ICollection> {
    const authorization: string = headers['authorization'];
    return this.collectionService.findCollectionByUser(authorization);
  }

  @Post('card')
  async addCardToCollection(
    @Headers() headers: Record<string, string>,
    @Body() card: Card,
  ): Promise<ICollection> {
    const authorization: string = headers['authorization'];
    return this.collectionService.addCardToCollection(authorization, card);
  }
}
