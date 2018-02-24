var passport=require('passport');
var {Users}=require('../model/user');
var LocalStrategy=require('passport-local').Strategy;
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');


passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

passport.use(new LocalStrategy((username,password,done)=>{
    Users.findOne({username:username}).then((user)=>{
        //console.log(user);
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
                var token=jwt.sign({_id: user._id.toHexString()},'FOODAPI').toString();
                console.log("inside login token :"+ token);
                Users.findOneAndUpdate({username: user.username,password: user.password},{
                    $set:{
                        token:token
                    }
                }).then((docs)=>{
                    Token=token;
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

module.exports=passport;