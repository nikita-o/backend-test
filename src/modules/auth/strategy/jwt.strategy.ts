import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => req?.cookies?.JWTtoken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT.secret'),
    });
  }

  async validate(payload: any): Promise<User> {
    const { iat, exp, ...user } = payload;
    return user;
  }
}
