exports.route=(app)=>{
  var userController=require('../controller/userController');
  var categoryController=require('../controller/categoryController');

    app.post('/signUp',userController.signUp);

    //category
    app.get('/category',categoryController.getAll);
    app.post('/category',categoryController.newCategory);
};