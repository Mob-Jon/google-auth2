require('dotenv').config();

const passport = require('passport');
const GoogleAuth2 = require('passport-google-oauth2').Strategy;

passport.use(new GoogleAuth2({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
    passReqToCallback: true
},
    function(request, accessToken, refreshToken, profile, done){
        console.log('PROFILE', profile);
        return done(null, profile)
    }
))
