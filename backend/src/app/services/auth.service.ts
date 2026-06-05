import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { InvalidCredentialsException, InvalidTokenException } from 'lib';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string) {
    this.logger.debug(`Validating user: ${email}`);

    if (!email || !password) {
      this.logger.warn('Login attempt with missing credentials');
      throw new InvalidCredentialsException();
    }

    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        this.logger.warn(`Login attempt for non-existent user: ${email}`);
        throw new InvalidCredentialsException();
      }

      if (!user.password) {
        this.logger.warn(`User ${email} tried password login but is SSO-only`);
        throw new InvalidCredentialsException();
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        this.logger.warn(`Invalid password attempt for user: ${email}`);
        throw new InvalidCredentialsException();
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof InvalidCredentialsException) throw error;
      this.logger.error(
        `Unexpected error during user validation: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async login(user: any) {
    this.logger.log(`User logged in: ${user.email}`);

    try {
      const tokens = await this.tokenService.generateTokens(
        user.id,
        user.email,
      );
      await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      this.logger.error(
        `Error during login for user ${user.email}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Login failed');
    }
  }

  async refresh(userId: string, refreshToken: string) {
    this.logger.debug(`Token refresh attempt for userId: ${userId}`);

    if (!userId || !refreshToken) {
      this.logger.warn('Refresh attempt with missing userId or token');
      throw new InvalidTokenException();
    }

    try {
      const user = await this.userService.findById(userId);

      if (!user) {
        this.logger.warn(`Refresh attempt for non-existent userId: ${userId}`);
        throw new InvalidTokenException();
      }

      if (!user.refreshToken) {
        this.logger.warn(`Refresh attempt for logged-out userId: ${userId}`);
        throw new InvalidTokenException();
      }

      const tokenMatches = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!tokenMatches) {
        this.logger.warn(
          `Possible token theft detected for userId: ${userId} – invalidating all tokens`,
        );
        await this.userService.updateRefreshToken(userId, null);
        throw new InvalidTokenException();
      }

      const tokens = await this.tokenService.generateTokens(
        user.id,
        user.email,
      );
      await this.userService.updateRefreshToken(user.id, tokens.refresh_token);

      this.logger.log(`Token refreshed for userId: ${userId}`);
      return tokens;
    } catch (error) {
      if (error instanceof InvalidTokenException) throw error;
      this.logger.error(
        `Unexpected error during token refresh: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Token refresh failed');
    }
  }

  async logout(userId: string) {
    this.logger.log(`User logged out: ${userId}`);

    if (!userId) {
      this.logger.warn('Logout attempt with missing userId');
      throw new UnauthorizedException();
    }

    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        this.logger.warn(`Logout attempt for non-existent userId: ${userId}`);
        throw new UnauthorizedException();
      }

      await this.userService.updateRefreshToken(userId, null);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error(
        `Error during logout for userId ${userId}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Logout failed');
    }
  }
}
