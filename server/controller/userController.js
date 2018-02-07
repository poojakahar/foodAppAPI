var Users=require('./../model/user');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

exports.signUp=(req,res)=>{
     var usr=new Users({
         username: req.body.username
     });

     usr.password=bcrypt.hashSync(req.body.password,10);

     usr.save().then((docs)=>{
          res.json('1');
     },(err)=>{
        res.json('0');
     }).catch((err)=>{
        res.json('0');
     });
};

exports.signIn=(req,res)=>{
     Users.findOne({username: req.body.username}).then((user)=>{
          if(!user)
          {
               res.json('0')
          }
          else{
               if(!bcrypt.compareSync(req.body.password,user.password))
               {
                    res.json('0')
               }
               else
               {
                    var token=jwt.sign({username: user.username},'FOODAPI');

                    Users.findOneAndUpdate({username: user.username,password: user.password},{
                         $set:{
                              token:token
                         }
                    }).then((docs)=>{
                         res.header('auth',token);
                         res.json('1');
                    }).catch(()=>{
                         res.json('0');
                    });
               }
          }
     },(err)=>{
        res.json('0');
    }).catch((err)=>{
        res.json('0');
    });
};