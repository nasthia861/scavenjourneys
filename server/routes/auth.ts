import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv'

dotenv.config();
const authRoutes = Router();

const successLoginUrl = process.env.HOST + '/home';
const failedLoginUrl = process.env.HOST + '/welcome';

//Route to google oauth
authRoutes.get('/google', passport.authenticate('google',
{
  scope: ['email', 'profile']
}));

//Route for google redirect
authRoutes.get('/google/redirect', passport.authenticate('google',
{
  failureMessage: true,
  failureRedirect: failedLoginUrl,
  successRedirect: successLoginUrl
}),
(req, res) => {
  if (req.user) {
    res.render(successLoginUrl);
  } else {
    res.redirect(failedLoginUrl);
  }
});

//Route to logout of session
authRoutes.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

//Route used to request user data for the front-end
authRoutes.get('/getuser', (req, res) => {
  res.send(req.user);
} )

export default authRoutes;