import { Router } from "express";
import passport from "passport";

const auth = Router();

const successLoginUrl = process.env.HOST;
const failedLoginUrl = process.env.HOST + '/signup';

//routes to google oauth
auth.get('/google', passport.authenticate('google', 
{ 
  scope: ['email', 'profile']
}));

auth.get('/google/redirect', passport.authenticate('google', 
{
  failureMessage: true,
  failureRedirect: failedLoginUrl,
  successRedirect: successLoginUrl
}),
(req, res) => {
  if (req.user) {

    res.redirect(successLoginUrl);

  }
});

export default auth;