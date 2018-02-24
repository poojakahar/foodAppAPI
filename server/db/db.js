const mongoose=require('mongoose');


mongoose.connect("mongodb://localhost:27017/FoodApp").then((database)=>{
    console.log('Sucess');
    },(err)=>{
        console.log('Error: ' + err )
    }).catch((err)=>{
        console.log('Catch Error: ' + err )
});

module.exports=mongoose;