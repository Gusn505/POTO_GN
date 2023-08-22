const { Sequelize, DataTypes} = require("sequelize");

const sequelize=new Sequelize({

    host: "localhost",
    username: "root",
    password:"",
    database:"octa",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

const productsORM = sequelize.define("products",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    namep:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.DECIMAL
    },
    image:{
        type: DataTypes.STRING
    }


});

module.exports = productsORM;
