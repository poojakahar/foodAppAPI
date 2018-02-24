const mongoose=require('./../db/db');
var findOrCreate = require('mongoose-findorcreate');

var SUser=mongoose.Schema({
   username:{
       type: String,
       unique: true
   },
    password:{
       type: String,
        //unique:true
    },
    token:{
       type: String
    }
});

SUser.plugin(findOrCreate);
var Users=mongoose.model('User',SUser);

module.exports={Users};