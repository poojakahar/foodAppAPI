const mongoose=require('./../db/db');
var validate=require('mongoose-validator');

var subCat=[
    validate({
        validator: 'isLength',
        arguments:[3,20],
        message: 'Sub category name between {ARGS[0]} and {ARGS[1]}'
    }),
    validate({
        validator: 'isAlpha',
        passIfEmpty:false,
        message: 'Sub category name'
    })
]
var SSubCategory=mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:['Category']
    },
    subcategory_name:{
        //required:true,
        //unique: true,
        type: String,
        //validate:subCat
    },
    image:{
        type:String
    },
    price:{
        type:Number
    }
});

var SubCategory=mongoose.model('SubCategory',SSubCategory);

module.exports=SubCategory;