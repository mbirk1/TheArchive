import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../database/entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async findSpecificCardById(id: string): Promise<Card> {
    return this.cardRepository.findOne({
      where: {
        id: id
      }
    });
  }
}
