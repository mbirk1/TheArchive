import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Deck } from '../database/entities/deck.entity';
import { DecksService } from '../services/decks.service';
import { DecksController } from '../controller/decks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), HttpModule],
  providers: [DecksService],
  controllers: [DecksController],
})
export class DeckModule {}
