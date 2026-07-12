import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigEnvService } from '../config/config.service';
export type GoogleUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
};

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configEnvService: ConfigEnvService) {
    const clientID = configEnvService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configEnvService.get('GOOGLE_CLIENT_SECRET');
    const port =
      configEnvService.get('NODE_ENV') === 'dev'
        ? `:${configEnvService.get('PORT')}`
        : '';
    const callbackURL = `${configEnvService.get('BACKEND_URL')}${port}/auth/google/redirect`;
    console.log({ callbackURL });
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }
  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): GoogleUser {
    const {
      _json: { family_name, given_name, email, picture },
    } = profile;

    return {
      email,
      firstName: family_name,
      lastName: given_name,
      picture,
    };
  }
}
