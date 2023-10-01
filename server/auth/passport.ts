import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';
import { User } from '../db/User';
import  AppDataSource  from '../db/index';
import { Profile } from 'passport-google-oauth';

passport.use(new GoogleStrategy ({

      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/redirect`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    },
    async (
      accessToken: string, 
      refreshToken: string, 
      profile: Profile, 
      done: VerifyCallback) => {

      const authUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos,
        googleId: profile.id
      };
      let user = await AppDataSource
      .createQueryBuilder()
      .select('user')
      .from(User,'username' )
      .where('user.id = :id', { id: authUser.googleId})
      .getOne();

      if (!user ) {
         user = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            id: authUser.googleId,
            username: authUser.username,
            img_url: authUser.picture,
          }
        ])
        .execute();
      }

      if (user) {
        done(null, user);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser(async(user, done) => {
        done(null, user);
})

module.exports = passport;