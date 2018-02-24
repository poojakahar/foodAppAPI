var SubCategory=require('./../model/subCategory'),
    path = require('path');
//var {ObjectId}=require('');

exports.getAll=(req,res)=>{
    var qur=req.query;
    console.log(qur);

    if(qur.id)
    {
        SubCategory.find({category_id:qur.id}).then((docs)=>{
            console.log(docs);
            var newArr=[];
            docs.map((val,key)=>{
                var obj={
                    _id:val._id,
                    subcategory_name:val.subcategory_name,
                    price:val.price,
                    image:path.join(__dirname,"./../../upload/",val.image)
                }
                newArr.push(obj);
            });

            //docs.push(path.join(__dirname,"./../../upload/"))
            res.json(newArr);
        },(err)=>{
            res.send("0 " + err);
        }).catch((err)=>{
            res.send("0 " + err);
        });
    }
    else
    {
        SubCategory.find().then((docs)=>{
            console.log(docs);
            var newArr=[];
            docs.map((val,key)=>{
                var obj={
                    _id:val._id,
                    subcategory_name:val.subcategory_name,
                    price:val.price,
                    image:path.join(__dirname,"./../../upload/",val.image)
                }
                newArr.push(obj);
            });

            //docs.push(path.join(__dirname,"./../../upload/"))
            res.json(newArr);
        },(err)=>{
            res.send("0 " + err);
        }).catch((err)=>{
            res.send("0 " + err);
        });
    }

}

exports.newSubCategory=(req,res)=>{

    console.log(req.body);
    console.log(req.files);

    //file upload
    if (req.files.sample === undefined)
    {
        return res.status(400).send('no file found');
    }

    let file = req.files.sample;
    //console.log(__dirname + " " + file.name);

    let uploadpath = path.join(__dirname,"./../../upload/" , file.name);
    console.log(uploadpath);

    file.mv(uploadpath).then((docs) => {
        var c=new SubCategory();

        c.category_id=req.body.category_id;
        c.subcategory_name=req.body.subcategory_name;
        c.price=req.body.price;
        c.image=file.name;


        c.save().then((docs)=>{
            res.json("1");
        },(err)=>{
            res.json("0" + err);
        }).catch((err)=>{
            res.json("0" + err);
        });
    },(err)=>{
        console.log("Image upload error" + err);
    });
}

exports.JoinData=(req,res)=>{
    SubCategory.find().populate('category_id').where('price').gt(100).then((docs)=>{
        docs.map((value,key)=>{
            //console.log(key + " " + value.category_id.category_name);

            if(value.category_id.category_name=='Starters')
            {
                console.log("Got it")
            }
        })
        console.log(docs[0]["category_id"].category_name);
        res.json(docs)
    }).catch((err)=>{
        res.json(err)
    })
}

exports.queryData=(req,res)=>{
    SubCategory.find({price:{$gt:100}}).where('category_id').equals('5a7d5aebdf304627b25af277').sort({price:-1}).then((docs)=>{
        res.json(docs);
    },(err)=>{
        res.json("0" + err);
    }).catch((err)=>{
        res.json("0" + err);
    });

    /*SubCategory.find({price:{$gt:100}}).then((docs)=>{
        res.json(docs);
    },(err)=>{
        res.json("0" + err);
    }).catch((err)=>{
        res.json("0" + err);
    });*/
}