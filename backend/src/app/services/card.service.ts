import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../database/entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScryfallRepository } from '../repositories/scryfall.repository';
import { ICard, PaginationDto } from 'lib';
import { PaginationResponse } from 'lib';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private scryFallRepository: ScryfallRepository,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Card>> {
    const { limit = 10, offset = 0 } = paginationDto;

    const [cards, total] = await this.cardRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      limit: paginationDto.limit,
      nextPage: total > offset + limit ? offset + limit : null,
      offset: paginationDto.offset,
      data: cards,
      total: total,
    };
  }

  async findSpecificCardById(id: string): Promise<Card> {
    return this.cardRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async searchForCardsByName(name: string): Promise<Card[]> {
    const foundCards = await this.cardRepository.findBy({ name });

    const externalFoundCard = await this.scryFallRepository.searchByName(name);

    // Karten aus foundCards aus externalCards streichen

    //Arrays aggegieren

    // Result zurückgeben
    return this.cardRepository.find({});
  }

  async getRandomCard(): Promise<ICard> {
    const count = await this.cardRepository.count();
    const randomOffset = Math.floor(Math.random() * count);

    return this.cardRepository
      .createQueryBuilder('card')
      .skip(randomOffset)
      .take(1)
      .getOne();
  }

  async getAmountOfCards(): Promise<number> {
    return this.cardRepository.count();
  }
}
