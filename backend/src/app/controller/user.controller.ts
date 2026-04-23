import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ICreateUserFormDataValue, IUser, IUserSignInFormDataValue } from 'lib';
import { LoggingService } from '../services/logging.service';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  constructor(private logger: LoggingService) {
    this.logger.setContext(UserController.name);
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

  @Post('signIn')
  async signingUserIn(@Body() user: IUserSignInFormDataValue): Promise<IUser> {
    try {
      this.logger.info(
        `Received login request for user with mail ${user.eMail})`,
      );
      const signIn: IUser = await this.userService.signInUser(user);
      this.logger.info(`Successfully logged in user with mail ${user.eMail}`);
      return (signIn);
    } catch (error) {
      this.logger.error(`Error loging in user with mail ${user.eMail}`, error);
      return Promise.reject(error);
    }
  }
}
