import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import session from "express-session";
dotenv.config();

const router = Router();

const successLoginUrl = process.env.HOST;
const failedLoginUrl = process.env.HOST + '/signup';

//routes to google oauth
router.get('/google', passport.authenticate('google', 
{ 
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google', 
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

export default router;