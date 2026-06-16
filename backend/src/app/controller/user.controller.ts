import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IRegisterRequest, IUser } from 'lib';
import { LoggingService } from '../services/logging.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private logger: LoggingService,
    private userService: UserService,
  ) {
    this.logger.setContext(UserController.name);
  }

  @Get('today')
  getAllActiveUsersToday(): Promise<number> {
    return this.userService.getAllActiveUsersToday();
  }

  @Get('amount')
  getNumberOfUsersRegistered(): Promise<number> {
    return this.userService.getNumberOfRegisteredUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getLoggedInUser(@Headers() headers: Record<string, string>): Promise<IUser> {
    const authorization: string = headers['authorization'];
    if (authorization.trim() === '') {
      throw new UnauthorizedException('Empty Header');
    }

    return this.userService.findCurrentUser(authorization);
  }

  @Post()
  async createUser(@Body() user: IRegisterRequest): Promise<IUser> {
    try {
      this.logger.info('Trying to create new user with email ' + user.email);
      return await this.userService.create(user);
    } catch (error) {
      this.logger.error('Error creating new user', error);
      return Promise.reject(error);
    }
  }
}
