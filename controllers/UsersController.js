const { check, validationResult } = require("express-validator");
const userModel = require ('../models/user');
const UserORM = require("../models/userORM");

const validationRules = [
    check('username').notEmpty().withMessage('username is required'),
    check('password').notEmpty().withMessage('password is required'),
    check('avatar').notEmpty().withMessage('avatar is required')
];

class UsersController{

    static async getAllUsers(req,res){
        //let results = await userModel.getUsers();
        let results = await UserORM.findAll();
        if (results){
            //res.send(results)
            res.render("users", {users: results});
        }
    }

    static async getUser(req,res){
        let id = req.params.id;
        //let results = await userModel.getUser(id);
        let results =  await UserORM.findByPk(id);
        if (results){
            //res.send(results)
            res.render("adduser", {user: results});
        }
    }

    static async addUser(req, res){
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.send(errors.errors[0].msg)
        }
        else{
            // let result = await userModel.addUser(
            //     req.body.username, 
            //     req.body.password, 
            //     req.body.avatar
            //     );
            
            let result = await UserORM.create({
                username: req.body.username, 
                password:req.body.password, 
                avatar: req.body.avatar});

            if(result){
                res.send("A new user has been added.");
            }else{
                res.send("Error.");
            }
        } 
    }

    static async updateUser(req, res){
        let id = req.params.id; //ROUTE //addUser//id
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.send(errors.errors[0].msg)
        }
        else{
            let result = await UserORM.update({
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar
            },
            {
                where:{id: id}
            });

            if(result){
                res.redirect('/auth/allproducts')
                //res.send("A new user has been updated.");
            }else{
                res.send("Error updating.");
            }
        } 
    }

    static async deleteUser(req,res){
        let id = req.params.id;
        let result = false;

        if (id){
            result = await UserORM.destroy({

                where:{
                    id: id
                }
                
            });

        }
        res.status(200).send("ok");
    }

}

module.exports = {
    validationRules,
    UsersController
};