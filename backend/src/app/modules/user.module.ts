import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from '../database/entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';
import { LoggerModule } from './logger.module';
import { TokenModule } from './token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    LoggerModule,
    TokenModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
