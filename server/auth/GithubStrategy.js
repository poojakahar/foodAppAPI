var passport=require('passport');
var Users=require('../model/user');
var GitHubStrategy=require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID:'2fe1bd2f82a762375bd2',
        clientSecret:'a70a2b2a430e7b79905d989bce8776c5eebd3d7f',
        callbackURL:'http://localhost:3000/auth/github/callback'

    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        Users.findOrCreate({username:profile.id},{username:profile.id,token:accessToken}, function (err, user) {
            console.log(user);
            return done(err, user);
        })
    }
))

module.exports=passport;