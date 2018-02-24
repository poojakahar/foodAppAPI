var triggers=require('mongo-triggers');
const mongoose=require('./../db/db');
//var Category=require('../model/category')
var {Users}=require('../model/user')

console.log(db);
triggers(Users).save((document,next)=>{
    console.log("In Trigger")
    next();
})

triggers(db.models.User).on('save', function (error, result, query, update, options) {
    console.log('In Listener')
});

exports=triggers;