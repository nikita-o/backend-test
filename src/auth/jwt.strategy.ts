import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

const configService: ConfigService = new ConfigService(); // FIXME: костыль, в конструктор почему то нельзя ConfigService =(

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',  // FIXME:
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}