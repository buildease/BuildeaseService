const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Architecture = require('../models/architecture');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');

const auth = require('../middleware/auth');

const limitValue = 6;

exports.insertingArchitecture = function (req, res, next) {
    console.log(req.body)
    const architecture = new Architecture(req.body);
    architecture.architectureId = uuidv1();
    architecture.save((err, architecture) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Architecture": architecture });
        }
    });
}

exports.updateArchitecture = function (req, res, next) {
    const architecture = new Architecture(req.body);
    Architecture.updateOne({ _id: req.body.architectureId }, {
        name: architecture.name, description: architecture.description,
        imgUrl: architecture.imgUrl
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

exports.ArchitectureList = function (req, res, next) {
    Architecture.find({}, (err, list) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "ArchitectureList": list });
        }
    });
}

// pagination
// exports.ArchitectureList = function (req, res, next) {
//     const page = parseInt(req.query.page);
//     console.log(page);
//     Architecture.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
//         res.status(200).json(results);
//     });
// }


exports.findByArchitectureId = function (req, res, next) {
    Architecture.findOne({ _id: req.params.architectureId }, (err, architecture) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "Architecture": architecture });
        }
    });
}

exports.deleteArchitecture = function (req, res, next) {
    Architecture.deleteOne({ _id: req.params.architectureId }, (err, architecture) => {
        if (architecture.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (architecture.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}


