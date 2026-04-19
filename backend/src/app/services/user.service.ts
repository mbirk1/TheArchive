import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { ICreateUserFormDataValue, IUser } from 'lib';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
    if (await argon2.verify(user.password, user.confirmPassword)) {
      const toBeRegistered = {
        userName: user.userName,
        email: user.eMail,
        password: user.password,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      }
      return this.userRepository.save(toBeRegistered);
    }
    return;
  }
}
