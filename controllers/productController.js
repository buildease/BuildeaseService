const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Product = require('../models/product');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');

const auth = require('../middleware/auth');


exports.findByProdcutId = function (req, res, next) {
    Product.findOne({ "productId": req.params.productId }, (err, product) => {

        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Product": product });
        }
    });
}

exports.productList = function (req, res, next) {

    Product.find({}, (err, list) => {

        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "ProductList": list });
        }
    });
}

exports.insertingProduct = function (req, res, next) {
    const product = new Product(req.body);
    product.productId = uuidv1();
    product.save((err, product) => {

        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Product": product });
        }
    });
}

exports.deleteProduct = function (req, res, next) {

    Product.deleteOne({ "productId": req.params.productId }, (err, product) => {

        if (product.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (product.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });

}


exports.updateProduct = function (req, res, next) {

    const product = new Product(req.body);


    Product.updateOne({ productId: req.body.productId }, {
        "productName": product.productName, "productCategory": product.productCategory,
        "productCost": product.productCost
    }, function (err, affected, resp) {
        if (err) {
            res.send({ "Success": false });
        } else if (affected.nModified != 0) {
            res.send({ "Success": true });
        } else {
            res.send({ "Success": false, "Message": "Not Updated" });
        }

    });

}





