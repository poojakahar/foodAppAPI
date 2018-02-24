const mongoose=require('./../db/db');

var SCategory=mongoose.Schema({
    category_name:{
        //required:true,
        //unique: true,
        type: String
    },
    image:{
        type:String
    }
});

var Category=mongoose.model('Category',SCategory);

module.exports=Category;