import { Module } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { CardController } from '../controller/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../database/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card])
  ],
  providers: [
    CardService,
  ],
  controllers: [CardController],
})
export class CardModule {}
