var express=require('express');
var bodyParse=require('body-parser');
var passport=require('passport');
var fileUpload = require('express-fileupload');

var router=require('./router/router')
var app=express();

global.Token="1";
global.db='';

app.use(bodyParse.json());
app.use(passport.initialize());
app.use(passport.session());

//FOR IMAGE UPLOAD
app.use(fileUpload());

router.route(app);

app.listen(3000,()=>{
    console.log('Server Started');
});