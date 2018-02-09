const express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express(),
    path = require('path');

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (req.files.sample === undefined)
    {
        return res.status(400).send('no file found');
    }

    let file = req.files.sample;
    console.log(__dirname + " " + file.name);

    let uploadpath = path.join(__dirname,"/../upload/" , file.name);
    console.log(uploadpath);

    file.mv(uploadpath, (err) => {
        if (err) {
            //return res.status(400).send(err).end();
        }
        res.status(200).send("success");
    });
});


app.get('/upload',(req,res)=>{
    let uploadpath = path.join(__dirname,"/../upload/test.jpg");
    res.json(uploadpath);
});

app.listen(3000, () => {
    console.log('app run on ',3000)
});