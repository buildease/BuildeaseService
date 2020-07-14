const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const InteriordesignAppointment = require('../models/interiordesignappointment');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');
const auth = require('../middleware/auth');

exports.insertingInteriordesignAppointment = function (req, res, next) {
    console.log(req.body)
    const interiordesignappointment = new InteriordesignAppointment(req.body);
    interiordesignappointment.architectureId = uuidv1();
    interiordesignappointment.save((err, interiordesignappointment) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "InteriordesignAppointment": interiordesignappointment });
        }
    });
}

exports.deleteInteriordesignAppointment = function (req, res, next) {
    InteriordesignAppointment.deleteOne({ _id: req.params.interiordesignAppointmentId }, (err, interiordesignappointment) => {
        if (interiordesignappointment.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (interiordesignappointment.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}