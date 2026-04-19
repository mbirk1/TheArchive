import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ICreateUserFormDataValue, IUser } from 'lib';
import { LoggingService } from '../services/logging.service';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  constructor(private logger: LoggingService) {
    this.logger.setContext(UserController.name)
  }

  @Get('today')
  getAllActiveUsersToday(): Promise<number> {
    return this.userService.getAllActiveUsersToday();
  }

  @Post()
  async createUser(@Body() user: ICreateUserFormDataValue): Promise<IUser> {
    try {
      this.logger.info('Trying to create new user with email ' + user.eMail);
      return this.userService.createUser(user);
    } catch (error) {
      this.logger.error('Error creating new user', error);
      return Promise.reject(error);
    }
  }
}
