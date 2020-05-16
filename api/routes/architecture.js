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


router.post('/architecture', (req, res) => {
    // console.log(req.body)
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

    // const page = parseInt(req.query.page)
    // const limit = parseInt(req.query.limit)
    // const startIndex = (page - 1) * limit
    // const endIndex = page * limit

    Architecture.find()
        .select("architectureName _id architectureDescription")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                architectures: docs.map(doc => {
                    return {
                        architectureName: doc.architectureName,
                        architectureDescription: doc.architectureDescription,
                        _id: doc._id,
                    }
                })
            }
            // const results = {}
            // if(endIndex < response.length){
            //     results.next = {
            //         page:page + 1,
            //         limit: limit
            //     }
            // }
            // if(startIndex >0){
            //     results.previous = {
            //         page:page - 1,
            //         limit: limit
            //     }
            // }
            // results.results = response.slice(startIndex, endIndex)
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;