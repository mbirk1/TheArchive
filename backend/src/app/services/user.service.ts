import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { ICreateUserFormDataValue, IUser, IUserSignInFormDataValue } from 'lib';
import * as argon2 from 'argon2';
import { LoggingService } from './logging.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private logger: LoggingService,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getAllActiveUsersToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const users = await this.userRepository.count({
      where: {
        lastActiveAt: Between(start, end),
      },
    });

    return users;
  }

  async createUser(user: ICreateUserFormDataValue): Promise<IUser> {
    user.password = await argon2.hash(user.password);
    this.logger.info('Validating new user');
    if (await argon2.verify(user.password, user.confirmPassword)) {
      this.logger.info('Validated new user');
      const toBeRegistered = {
        userName: user.userName,
        email: user.eMail,
        password: user.password,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      const newUser = this.userRepository.save(toBeRegistered);
      this.logger.info('Created new user with mail ' + user.eMail);
      return newUser;
    }
    return;
  }

  async signInUser(user: IUserSignInFormDataValue): Promise<boolean> {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        email: user.eMail,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (!(await argon2.verify(foundUser.password, user.password))) {
      throw new UnauthorizedException();
    }
    this.updateLastActive(foundUser);
    return true;
  }

  private updateLastActive(user: User): void {
    user.lastActiveAt = new Date();
    this.userRepository.save(user);
  }
}
