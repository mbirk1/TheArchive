import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { Collection } from '../database/entities/collection.entity';
import { ICollection } from 'lib';
import { Card } from '../database/entities/card.entity';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    private userService: UserService,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async findCollectionByUser(authorization: string): Promise<ICollection> {
    if (!authorization) {
      this.logger.warn('Authorization not given');
      return null;
    }

    try {
      const user: User = (await this.userService.findCurrentUser(
        authorization,
      )) as User;

      let collection: Collection = await this.collectionRepository.findOne({
        where: { user: user },
        relations: ['cards'],
      });

      if (!collection) {
        this.logger.debug(`Creating collection for user with id: ${user.id}`);
        collection = this.createCollectionForUser(user);
      }

      return collection;
    } catch (error) {
      this.logger.error(
        `Error finding collection for user with id: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database error');
    }
  }

 async addCardToCollection(authorization: string, card: Card): Promise<ICollection> {
    if (!authorization) {
      this.logger.warn('Authorization not given');
      return null;
    }

    try {
      const collection: ICollection = await this.findCollectionByUser(authorization);
      collection.cards.push(card);
      return this.collectionRepository.save(collection);
    } catch (error) {
      this.logger.error(
        `Error adding card to collection: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database error');
    }
  }

  createCollectionForUser(user: User): Collection {
    if (!user) {
      this.logger.error('No user given');
      return null;
    }



    const newCollection: ICollection = {
      user: user,
      cards: []
    }

    return this.collectionRepository.create(newCollection)
  }
}
