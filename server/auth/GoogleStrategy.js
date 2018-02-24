var passport=require('passport');
var Users=require('../model/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
        clientID: '290492513443-a4kco5jkovtr8o6es8v0couvn3hc0hqn.apps.googleusercontent.com',
        clientSecret:'YGi67WoaxP2ItM3hchnj4JeQ',
        callbackURL:'http://localhost:3000/auth/google/callback'

    },function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        Users.findOrCreate({ username: profile.id },{username:profile.id,token:accessToken}, function (err, user) {
            return done(err, user);
        });

    }
));

module.exports=passport;