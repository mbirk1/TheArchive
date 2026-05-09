import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from '../database/entities/deck.entity';
import { IDeck } from 'lib';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  findAll(): Promise<IDeck[]> {
    return this.deckRepository.find();
  }

  getNumberOfDecks(): Promise<number> {
    return this.deckRepository.count();
  }
}
