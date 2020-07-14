const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const ConstructionAppointment = require('../models/constructionappointment');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');
const auth = require('../middleware/auth');

exports.insertingConstructionAppointment = function (req, res, next) {
    console.log(req.body)
    const constructionappointment = new ConstructionAppointment(req.body);
    constructionappointment.architectureId = uuidv1();
    constructionappointment.save((err, constructionappointment) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "ConstructionAppointment": constructionappointment });
        }
    });
}

exports.deleteConstructionAppointment = function (req, res, next) {
    ConstructionAppointment.deleteOne({ _id: req.params.constructionAppointmentId }, (err, constructionappointment) => {
        if (constructionappointment.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (constructionappointment.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}