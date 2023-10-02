import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import AppDataSource from '../db/index';
import { User } from '../db/User';

dotenv.config();

passport.use(new GoogleStrategy ({

      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/redirect`

    },

    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any) => {

      const authUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].toString(),
        googleId: profile.id
      };
      
      let user = await AppDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: authUser.username})
      .getOne();

      if (!user ) {
         await AppDataSource
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
        return cb(null, user);
      }
    }
  )
);

//stores user object in a session
passport.serializeUser((user: any, done: any) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
  let user = await AppDataSource
  .getRepository(User)
  .createQueryBuilder('user')
  .where('user.id = :id', { id: id})
  .getOne();
  try {

    if (user) {
      done(null, user);
    } else {
      return done(new Error('No user found'), null);
    }
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
})

export default passport;