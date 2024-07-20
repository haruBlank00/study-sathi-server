import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy, StrategyOptionsWithRequest } from 'passport-github2';
import { AuthProviderEnum } from '../../auth.enum';

// import { AuthService } from 'src/module/auth/auth.service';
// import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(
  Strategy,
  AuthProviderEnum.GITHUB,
) {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URI,
      passReqToCallback: true,
      scope: ['user:email'],
    } as StrategyOptionsWithRequest);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err, data) => void,
  ): Promise<any> {
    try {
      const profileObj = { ...profile._json, email: profile.x };
      const response = await fetch('https://api.github.com/user/emails', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error('An error occurred during github login');
      }
      const emails = await response.json();
      profileObj.email = emails.sort((a, b) => b.primary - a.primary)[0]
        .email;
      done(null, {
        access: accessToken,
        refresh: refreshToken,
        profile: profileObj,
      });
    } catch (error) {
      console.error(error);
      done(null, false);
    }
  }
}
