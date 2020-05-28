const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const validator = require("../../validators/validators");
const _ = require('lodash');
const Interiordesign = require("../../models/interiordesign")

const limitValue = 6;

router.post('/interiordesign', (req, res) => {
    const { errors, isValid } = validator.interiordesignValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Interiordesign.findOne({ interiordesignName: req.body.interiordesignName })
        .then((interior) => {
            const newInteriordesign = new Interiordesign(req.body);
            newInteriordesign.save((err, result) => {
                if (err) {
                    res.status(400).json({ error: "Interiordesign error" });
                } else {
                    res.status(200).json(newInteriordesign);
                }
            });
        })
})

router.get('/interiordesign', (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page);
    Interiordesign.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
        res.status(200).json(results);
    });
})

router.delete('/interiordesign/:id', function (req, res) {
    Interiordesign.remove({
        _id: req.params.id
    }, function (err, interior) {
        if (err) return res.send(err);
        res.json({ message: 'Interiordesign Deleted' });
    });
});

module.exports = router;