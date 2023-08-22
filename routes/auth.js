var express = require('express');
var router = express.Router();

const passport = require ('../controllers/AuthController');

const{
    validationRules,
    UsersController
} = require ('../controllers/UsersController');

const {
validationRulesP,
ProductController
    
} = require('../controllers/ProductController');

const productsORM = require('../models/productsORM');

router.get('/login',function (req,res){
    res.render ('login');
});

router.get('/protected', passport.authenticate('session'), function(req, res){
    res.send('Welcome to protected section')
 });

router.post('/login', passport.authenticate(
    'local',
    {
        successRedirect: "/",
        failureRedirect: "/auth/login"

    }
));

router.get('/register',(req,res)=>{
    res.render('register');
  });
  
  router.post('/register',validationRules, UsersController.addUser);




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
  router.get('/addProduct',(req,res)=>{
    res.render('addProduct');
  });
  
  router.get('/registerProducts',(req,res)=>{
    res.render('registerProducts');
  });

  router.get('/addProduct/:id',ProductController.getProduct);

  router.post('/addProduct',validationRulesP,ProductController.addProduct);

  router.post('/addProduct/:id',validationRulesP, ProductController.updateProduct);

  router.get('/allproducts',ProductController.getAllProducts);

  router.delete('/deleteProduct/:id',validationRulesP, ProductController.deleteProduct);



module.exports = router;