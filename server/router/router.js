exports.route=(app)=>{
    var userController=require('../controller/userController');
    var categoryController=require('../controller/categoryController');
    var subCategoryContoller=require('../controller/subCategoryContoller');
    var passportGoogle=require('../auth/GoogleStrategy')
    var passportLocal=require('../auth/LocalStrategy')
    var passportGithub=require('../auth/GithubStrategy')
    //var userTrigger=require('../middleware/userTrigger')

    app.get('/success',(req,res)=>{
        res.status(200).json(Token);
    });

    app.get('/fail',(req,res)=>{
        res.status(404).json("Login Fail");
    });

    // Sign Up and sign in
    app.post('/signUp',userController.signUp);
    app.get('/signUp',userController.getAll);

    //Google
    app.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback',passportGoogle.authenticate('google',{failureRedirect: '/fail'}),
        (req,res)=>{
            res.redirect('/success');
        }
    )

    //Local
    app.post('/signIn',passportLocal.authenticate('local',{
        successRedirect:'/success',
        failureRedirect: '/fail'
    }));

    //Github
    app.get('/auth/github', passportGithub.authenticate('github', { scope: ['profile'] }));
    app.get('/auth/github/callback',passportGithub.authenticate('github',{failureRedirect: '/fail'}),
        (req,res)=>{
            res.redirect('/success');
        }
    )

    //logout
    app.post("/logout",userController.logout);

    //category
    app.get('/category',categoryController.getAll);
    app.post('/category',categoryController.newCategory);
    app.put('/category',categoryController.updCategory);

    //subcategory
    app.get('/subcategory',subCategoryContoller.getAll);
    app.get('/subcategoryjoin',subCategoryContoller.JoinData)
    app.get('/subcategoryqur',subCategoryContoller.queryData)
    //app.get('/subcategory/getOne',subCategoryContoller.getOne);
    app.post('/subcategory',subCategoryContoller.newSubCategory);
};