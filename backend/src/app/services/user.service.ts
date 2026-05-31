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
import { IRegisterRequest } from 'lib';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      const user = await this.userRepository.findOne({ where: { id } });

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
}