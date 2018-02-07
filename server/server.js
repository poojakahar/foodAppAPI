var express=require('express');
var bodyParse=require('body-parser');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

var router=require('./router/router')
var Users=require('./model/user');
var app=express();

app.use(bodyParse.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

passport.use(new LocalStrategy((username,password,done)=>{
    Users.findOne({username:username}).then((user)=>{
        console.log(user);
        if(!user)
        {
            console.log("In Main if" + username + " " + password);
            return done(null,false);
        }
        else
        {
            if(!bcrypt.compareSync(password,user.password))
            {
                console.log("In encrypt if");
                return done(null,false);
            }
            else
            {
                var token=jwt.sign({username: user.username,password:user.password},'FOODAPI');

                Users.findOneAndUpdate({username: user.username,password: user.password},{
                    $set:{
                        token:token
                    }
                }).then((docs)=>{
                    return done(null,true);
                }).catch(()=>{
                    console.log("In encrypt if");
                    return done(null,false);
                });
            }
        }
    },(err)=>{
        console.log('err');
        return done(null,false);
    });
}));

app.post('/signIn',passport.authenticate('local',{
    successRedirect:'/success',
    failureRedirect: '/fail'
}));

app.get('/success',(req,res)=>{
    res.json("1");
});

app.get('/fail',(req,res)=>{
    res.json("0");
});

//Google Strategy
passport.use(new GoogleStrategy({
        clientID: '290492513443-a4kco5jkovtr8o6es8v0couvn3hc0hqn.apps.googleusercontent.com',
        clientSecret:'YGi67WoaxP2ItM3hchnj4JeQ',
        callbackURL:'http://localhost:3000/auth/google/callback'
    },function(accessToken, refreshToken, profile, done) {
    console.log(profile);
        Users.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));


app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/fail'}),
    (req,res)=>{
        res.redirect('/success');
    }
)

router.route(app);

app.listen(3000,()=>{
    console.log('Server Started');
});