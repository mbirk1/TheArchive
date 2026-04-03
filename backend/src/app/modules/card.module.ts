import { Module } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { CardController } from '../controller/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../database/entities/card.entity';
import { ScryfallRepository } from '../repositories/scryfall.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), HttpModule],
  providers: [CardService, ScryfallRepository],
  controllers: [CardController],
})
export class CardModule {}
