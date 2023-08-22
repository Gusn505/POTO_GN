var express = require('express');
var router = express.Router();

//const usersController = require('../controllers/UsersController');
const {validationRules,UsersController} = require("../controllers/UsersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',layout:'layout2' });
});

router.get('/allusers',UsersController.getAllUsers);

router.get('/addUser',(req,res)=>{
  res.render('addUser');
});

router.get('/addUser/:id',UsersController.getUser);

router.post('/addUser',validationRules, UsersController.addUser);

router.post('/addUser/:id',validationRules, UsersController.updateUser);

router.delete('/deleteUser/:id',validationRules, UsersController.deleteUser);

module.exports = router;
