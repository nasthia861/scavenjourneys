// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import AppDataSource from '../db/index';
import { User } from '../db/entities/User';

passport.use(new GoogleStrategy ({

      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/redirect`,
      passReqToCallback: true

    },

    async (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any) => {
        
      const authUser = {
        googleId: profile.id,
        username: profile.displayName,
        picture: profile.picture,
      };

      try {

      let user = await AppDataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.username = :username', { username: authUser.username})
      .getOne();

      if (user) {
        return done(null, user);
      }

      if (!user ) {
         await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            google_id: authUser.googleId,
            username: authUser.username,
            img_url: authUser.picture,
          }
        ])
        .execute();
      }

    } catch(err) {

      return done(err);

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
    return done(err, null);
  }
})

export default passport;