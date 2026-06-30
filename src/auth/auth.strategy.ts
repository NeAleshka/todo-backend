import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

export type GoogleUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  validate(profile: Profile): GoogleUser {
    const {
      _json: { given_name, family_name },
      photos,
      emails,
    } = profile;

    return {
      email: emails?.[0].value,
      firstName: given_name,
      lastName: family_name,
      picture: photos?.[0]?.value,
    };
  }
}
