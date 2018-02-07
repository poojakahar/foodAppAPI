var category=require('./../model/category');

exports.getAll=(req,res)=>{
   category.find().then((docs)=>{
       res.json(docs);
   },(err)=>{
       res.send("0 " + err);
   }).catch((err)=>{
       res.send("0 " + err);
   });
}

exports.newCategory=(req,res)=>{
        var c=new category();
        c.category_name=req.body.category_name;

        c.save().then((docs)=>{
            res.json("1");
        },(err)=>{
            res.json("0" + err);
        }).catch((err)=>{
            res.json("0" + err);
        });
}
