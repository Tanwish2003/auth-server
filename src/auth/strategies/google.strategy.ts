import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '311409374693-vqvs4vpffgal0aig4l9ntrjogkmo1dia.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://[::1]:3000/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      FirstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    done(null, user);
  }
}
