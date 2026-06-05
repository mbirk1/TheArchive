import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../auth-strategies/local.strategy';
import { JwtStrategy } from '../auth-strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../auth-strategies/jwt-refresh.strategy';
import { AuthController } from '../controller/auth.controller';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../services/token.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    ConfigService,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
