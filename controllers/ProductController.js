const { check, validationResult } = require("express-validator");
const productsORM = require("../models/productsORM");

const validationRulesP = [
  check("namep").notEmpty().withMessage("Product name is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("image").notEmpty().withMessage("Image is required"),
];

class ProductController {
  static async addProduct(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let result = await productsORM.create({
        namep: req.body.namep,
        price: req.body.price,
        image: req.body.image,
      });

      if (result) {
        res.render("registerProducts")
      } else {
        res.send("Error.");
      }
    }
  }

  static async getAllProducts(req,res){
    let results = await productsORM.findAll();
    if (results){
        res.render("allproducts", {products: results});
    }
}

static async updateProduct(req, res){
    let id = req.params.id; 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.send(errors.errors[0].msg)
    }
    else{

        let result = await productsORM.update({
            namep: req.body.namep,
            price: req.body.price,
            image: req.body.image
        },
        {
            where:{id: id}
        });

        if(result){
            res.redirect('/auth/allProducts')

        }else{
            res.send("Error updating.");
        }
    } 
}

static async getProduct(req,res){
  let id = req.params.id;
  let results =  await productsORM.findByPk(id);
  if (results){
      //res.send(results)
      res.render("addProduct", {product: results});
  }
}


static async deleteProduct(req,res){
  let id = req.params.id;
  let result = false;

  if (id){
      result = await productsORM.destroy({

          where:{
              id: id
          }
          
      });

  }
  res.status(200).send("ok");
}


}

module.exports = {
  validationRulesP,
  ProductController,
};
