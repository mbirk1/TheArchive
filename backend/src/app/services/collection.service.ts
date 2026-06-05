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

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    private userService: UserService,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async getNumberOfCards(authorization: string): Promise<ICollection> {
    if (!authorization) {
      this.logger.warn('Authorization not given');
      return null;
    }

    try {
      const user: User = (await this.userService.findCurrentUser(
        authorization,
      )) as User;

      const collection: Collection = await this.collectionRepository.findOne({
        where: { user: user },
        relations: ['cards'],
      });

      if (!collection) {
        this.logger.debug(`No collection found for user with id: ${user.id}`);
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
}
