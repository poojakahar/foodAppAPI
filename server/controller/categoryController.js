var category=require('./../model/category'),
    path = require('path');

exports.getAll=(req,res)=>{
   category.find().then((docs)=>{
       console.log(docs);
       var newArr=[];
       docs.map((val,key)=>{
            var obj={
                _id:val._id,
                category_name:val.category_name,
                image:path.join(__dirname,"./../../upload/",val.image)
            }
            newArr.push(obj);
       });

       //docs.push(path.join(__dirname,"./../../upload/"))
       res.status(200).json(newArr);
   },(err)=>{
       res.status(404).json(err);
   }).catch((err)=>{
       res.status(404).json(err);
   });
}

exports.newCategory=(req,res)=>{

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
            var c=new category();

            c.category_name=req.body.category_name;
            c.image=file.name;


            c.save().then((docs)=>{
                res.status(200).json(docs);
            },(err)=>{
                res.status(404).json(err);
            }).catch((err)=>{
                res.status(404).json(err);
            });
        },(err)=>{
            res.status(404).json(err);
        });
}

exports.updCategory=(req,res)=>{
    var id=req.param.id;
    var category_name=req.body.category_name;

    category.findOneAndUpdate({_id:id},{
        $set:{
            category_name:category_name
        }
    }).then((docs)=>{
        res.status(200).json(docs);
    },(err)=>{
        res.status(404).json(err);
    }).catch((err)=>{
        res.status(404).json(err);
    })
}