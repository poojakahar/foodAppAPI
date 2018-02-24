/*passport.serializeUser((user,done)=>{
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
});*/

//Google Strategy
/*passport.use(new GoogleStrategy({
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

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));


app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/fail'}),
    (req,res)=>{
        res.redirect('/success');
    }
)*/

//github Strategy
/*passport.use(new GitHubStrategy({
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
))*/

/*app.get('/auth/github',
    passport.authenticate('github', { scope: ['profile'] }));


app.get('/auth/github/callback',passport.authenticate('github',{failureRedirect: '/fail'}),
    (req,res)=>{
        res.redirect('/success');
    }
)*/