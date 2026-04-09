import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('today')
  getAllActiveUsersToday(): Promise<number> {
    return this.userService.getAllActiveUsersToday();
  }
}
