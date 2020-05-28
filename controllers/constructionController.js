const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Construction = require('../models/construction');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');

const auth = require('../middleware/auth');

const limitValue = 6;

exports.insertingConstruction = function (req, res, next) {
    console.log(req.body)
    const construction = new Construction(req.body);
    construction.constructionId = uuidv1();
    construction.save((err, construction) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Construction": construction });
        }
    });
}

exports.updateConstruction = function (req, res, next) {
    const construction = new Construction(req.body);
    Construction.updateOne({ _id: req.body.constructionId }, {
        name: construction.name, description: construction.description,
        imgUrl: construction.imgUrl
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

exports.ConstructionList = function (req, res, next) {
    Construction.find({}, (err, list) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "ConstructionList": list });
        }
    });
}

// pagination
// exports.ConstructionList = function (req, res, next) {
//     const page = parseInt(req.query.page);
//     console.log(page);
//     Construction.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
//         res.status(200).json(results);
//     });
// }

exports.findByConstructionId = function (req, res, next) {
    Construction.findOne({ _id: req.params.constructionId }, (err, construction) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Construction": construction });
        }
    });
}

exports.deleteConstruction = function (req, res, next) {
    Construction.deleteOne({ _id: req.params.constructionId }, (err, construction) => {
        if (construction.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (construction.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}


