import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv'

dotenv.config();
const authRoutes = Router();

const successLoginUrl = process.env.HOST + '/home';
const failedLoginUrl = process.env.HOST + '/welcome';

//routes to google oauth
authRoutes.get('/google', passport.authenticate('google',
{
  scope: ['email', 'profile']
}));

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

authRoutes.get('/getuser', (req, res) => {
  res.send(req.user);
} )

export default authRoutes;