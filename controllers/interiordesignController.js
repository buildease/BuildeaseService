const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Interiordesign = require('../models/interiordesign');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');

const auth = require('../middleware/auth');

const limitValue = 6;

exports.insertingInteriordesign = function (req, res, next) {
    console.log(req.body)
    const interiordesign = new Interiordesign(req.body);
    interiordesign.interiordesignId = uuidv1();
    interiordesign.save((err, interior) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Interiordesign": interior });
        }
    });
}

exports.updateInteriordesign = function (req, res, next) {
    const interiordesign = new Interiordesign(req.body);
    Interiordesign.updateOne({ _id: req.body.interiordesignId }, {
        name: interiordesign.name, description: interiordesign.description,
        imgUrl: interiordesign.imgUrl
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

exports.InteriordesignList = function (req, res, next) {
    Interiordesign.find({}, (err, list) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "InteriordesignList": list });
        }
    });
}

// pagination
// exports.InteriordesignList = function (req, res, next) {
//     const page = parseInt(req.query.page);
//     console.log(page);
//     Interiordesign.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
//         res.status(200).json(results);
//     });
// }

exports.findByInteriordesignId = function (req, res, next) {
    Interiordesign.findOne({ _id: req.params.interiordesignId }, (err, interiordesign) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Interiordesign": interiordesign });
        }
    });
}

exports.deleteInteriordesign = function (req, res, next) {
    Interiordesign.deleteOne({ _id: req.params.interiordesignId }, (err, interiordesign) => {
        if (interiordesign.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (interiordesign.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}


