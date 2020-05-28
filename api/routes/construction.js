const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const validator = require("../../validators/validators");
const _ = require('lodash');
const Construction = require("../../models/construction")

const limitValue = 6;

router.post('/construction', (req, res) => {
    const { errors, isValid } = validator.constructionValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Construction.findOne({ constructionName: req.body.constructionName })
        .then((construct) => {
            const newConstruction = new Construction(req.body);
            newConstruction.save((err, result) => {
                if (err) {
                    res.status(400).json({ error: "Construction error" });
                } else {
                    res.status(200).json(newConstruction);
                }
            });
        })
})

router.get('/construction', (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page);
    Construction.find({}, { "__v": 0 }, { skip: (page * limitValue), limit: limitValue }, function (err, results) {
        res.status(200).json(results);
    });
})

router.delete('/construction/:id', function (req, res) {
    Construction.remove({
        _id: req.params.id
    }, function (err, construction) {
        if (err) return res.send(err);
        res.json({ message: 'Construction Deleted' });
    });
});

module.exports = router;