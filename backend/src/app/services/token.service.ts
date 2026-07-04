import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService {
  private readonly logger: Logger = new Logger(TokenService.name);

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  extractAndValidate(authorizationHeader: string): JwtPayload {
    if (!authorizationHeader) {
      this.logger.warn('Missing authorization header');
      throw new UnauthorizedException('Missing authorization header');
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      this.logger.warn('Invalid authorization header format');
      throw new UnauthorizedException('Invalid authorization header format');
    }

    return this.validateToken(token);
  }

  validateToken(token: string): JwtPayload {
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      if (!payload.sub || !payload.email) {
        this.logger.warn('Token payload missing required fields');
        throw new UnauthorizedException('Invalid token payload');
      }

      return payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.warn(`Token validation failed: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async generateTokens(userId: string, email: string) {
    if (!userId || !email) {
      this.logger.error('generateTokens called with missing userId or email');
      throw new InternalServerErrorException();
    }

    const payload = { sub: userId, email };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }),
        this.jwtService.signAsync(payload, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      this.logger.error(
        `Error generating tokens: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Token generation failed');
    }
  }
}
