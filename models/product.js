const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName:{
        type:String,
        require:true
    },
    productCategory:{
        type:String,
        require:true
    },
    productCost:{
        type:String,
        require:true
    },
    productId:{
        type:String,
        require:true
    }
    
})

var collectionName = 'product'
const Product = mongoose.model('Product',ProductSchema ,collectionName);

module.exports = Product;

