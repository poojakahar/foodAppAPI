var {Users}=require('./../model/user');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

exports.signUp=(req,res)=>{
     var usr=new Users({
            username:req.body.username,
            password:bcrypt.hashSync(req.body.password,10)
     })

     usr.save().then((docs)=>{
         if(!docs)
         {
             return res.status(404).json("Not Saved");
         }
         res.status(200).json(docs);
     },(err)=>{
         res.status(404).json(err);
     }).catch((err)=>{
         res.status(404).json(err);
     });
};

exports.getAll=(req,res)=>{
    Users.find().then((docs)=>{
        res.status(200).json(docs)
    },(err)=>{
        res.status(404).json(err)
    }).catch((err)=>{
        res.status(404).json(err)
    })
}

exports.logout=(req,res)=>{
    var t=req.query.token;

    //console.log(t);
    Users.findOne({token:t}).then((docs)=>{
        //console.log(docs)
        if(!docs)
        {
            res.json("0")
        }
        //console.log("Remove token");

        Users.findOneAndUpdate({token:t},{
            $set:{
                token:''
            }
        }).then((docs)=>{
            res.json("1")
        },(err)=>{
            res.json("0")
        }).catch((err)=>{
            res.json("0")
        })
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}