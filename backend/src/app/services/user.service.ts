import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities/user.entity';
import { IRegisterRequest, IUser } from 'lib';
import { JwtPayload, TokenService } from './token.service';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  MASKED_VALUE = '***';
  SENSITIVE_FIELDS: (keyof IUser)[] = ['password', 'refreshToken'];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async getAllActiveUsersToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return await this.userRepository.count({
      where: {
        lastActiveAt: Between(start, end),
      },
    });
  }

  async create(createUserDto: IRegisterRequest): Promise<User> {
    this.logger.debug(`Creating user with email: ${createUserDto.email}`);

    if (!createUserDto.email) {
      this.logger.warn('Create user called without email');
      throw new InternalServerErrorException('Email is required');
    }

    try {
      const existing: User = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existing) {
        this.logger.warn(
          `User creation failed – email already exists: ${createUserDto.email}`,
        );
        throw new ConflictException('Email already in use');
      }

      const user: User = this.userRepository.create({
        userName: createUserDto.userName,
        createdAt: new Date(),
        lastActiveAt: new Date(),
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
      });

      const saved: User = await this.userRepository.save(user);
      this.logger.log(`User created successfully: ${saved.id}`);

      return saved;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      this.logger.error(
        `Unexpected error creating user: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      this.logger.warn('findByEmail called without email');
      return null;
    }

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        this.logger.debug(`No user found for email: ${email}`);
      }

      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user by email: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database error');
    }
  }

  async findById(id: string): Promise<User | null> {
    if (!id) {
      this.logger.warn('findById called without id');
      return null;
    }

    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['decks'],
      });

      if (!user) {
        this.logger.debug(`No user found for id: ${id}`);
      }

      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user by id: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database error');
    }
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    if (!userId) {
      this.logger.warn('updateRefreshToken called without userId');
      throw new InternalServerErrorException('UserId is required');
    }

    try {
      const user = await this.findById(userId);
      if (!user) {
        this.logger.warn(
          `updateRefreshToken called for non-existent userId: ${userId}`,
        );
        throw new NotFoundException('User not found');
      }

      const hashed = refreshToken ? await bcrypt.hash(refreshToken, 10) : null;

      await this.userRepository.update(userId, { refreshToken: hashed });
      this.logger.debug(`Refresh token updated for userId: ${userId}`);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(
        `Error updating refresh token for userId ${userId}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update refresh token');
    }
  }

  getNumberOfRegisteredUsers(): Promise<number> {
    return this.userRepository.count({});
  }

  async findCurrentUser(authorization: string): Promise<IUser> {
    const extractData: JwtPayload =
      this.tokenService.extractAndValidate(authorization);
    let user: IUser = await this.findById(extractData.sub);
    if (!user) {
      throw new ConflictException('User not found');
    }

    user = this.sanitizeEntity(user);

    return user;
  }

  sanitizeEntity<T extends DeepPartial<IUser>>(entity: T): T {
    if (!entity) {
      throw new Error('sanitizeEntity: entity is required');
    }

    const copy = structuredClone(entity);

    for (const field of this.SENSITIVE_FIELDS) {
      if (field in copy && copy[field] !== undefined) {
        (copy as Record<string, unknown>)[field as string] = this.MASKED_VALUE;
      }
    }

    return copy;
  }
}
