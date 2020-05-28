const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const validator = require("../../validators/validators");
const nodemailer = require("nodemailer");
const _ = require('lodash');
const Architecture = require("../../models/architecture")

const limitValue = 6;

router.post('/architecture', (req, res) => {
    const { errors, isValid } = validator.architectureValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Architecture.findOne({ architectureName: req.body.architectureName })
        .then((architect) => {
            const newArchitecture = new Architecture(req.body);
            newArchitecture.save((err, result) => {
                if (err) {
                    res.status(400).json({ error: "architecture error" });
                } else {
                    res.status(200).json(newArchitecture);
                }
            });
        })
})

router.get('/architecture', (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page);
    Architecture.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
        res.status(200).json(results);
    });
})

router.delete('/architecture/:id', function (req, res) {
    Architecture.remove({
        _id: req.params.id
    }, function (err, architecture) {
        if (err) return res.send(err);
        res.json({ message: 'Architecture Deleted' });
    });
});

module.exports = router;