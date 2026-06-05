import { Module } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { TokenService } from '../services/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [LoggerModule],
  providers: [TokenService, JwtService, ConfigService],
  controllers: [],
  exports: [TokenService],
})
export class TokenModule {}
