const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const ArchitectureAppointment = require('../models/architectureappointment');
const config = require('../config/Config');
const { v1: uuidv1 } = require('uuid');
const auth = require('../middleware/auth');

exports.insertingArchitectureAppointment = function (req, res, next) {
    console.log(req.body)
    const architectureappointment = new ArchitectureAppointment(req.body);
    architectureappointment.architectureId = uuidv1();
    architectureappointment.save((err, architectureappointment) => {
        if (err) {
            res.send({ "Success": false });
        } else {
            res.send({ "Success": true, "ArchitectureAppointment": architectureappointment });
        }
    });
}

exports.deleteArchitectureAppointment = function (req, res, next) {
    ArchitectureAppointment.deleteOne({ _id: req.params.architectureAppointmentId }, (err, architectureappointment) => {
        if (architectureappointment.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (architectureappointment.deletedCount != 0) {
            res.send({ "Success": true });
        }
        if (err) {
            res.send({ "Success": false });
        }

    });
}