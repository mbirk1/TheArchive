import { Controller, Get, Headers } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get()
  getNumberOfCardsInCollection(@Headers() headers: Record<string, string>) {
    const authorization: string = headers['authorization'];
    return this.collectionService.getNumberOfCards(authorization);
  }
}
