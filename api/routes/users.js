const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const Users = require('../../models/users');
const validator = require("../../validators/validators");
const nodemailer = require("nodemailer");
const _ = require('lodash');


router.post('/login', (req, res) => {
    const { errors, isValid } = validator.loginValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) res.status(404).json({ "email": "Email Id doesn't exist." });
            bcrypt
                .compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        res.status(400).json({ "password": "Password do not match" })
                    }
                    else {
                        const payload = {
                            id: user.id,
                            name: user.name,
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 2155926
                            },
                            (err, token) => {
                                if (err) {
                                    res.json({ "message": "error occured" });
                                } else {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                    return user.updateOne({ accessToken: token }, function (err, success) {
                                        console.log("replaced access token successfully!!!");
                                    })
                                }
                            }
                        )
                    }
                })

        })
})

router.delete('/:id', function (req, res) {
    Users.remove({
        _id: req.params.id
    }, function (err, users) {
        if (err) return res.send(err);
        res.json({ message: 'Users Deleted' });
    });
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validator.registerValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users
        .findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(404).json({ "email": "Email Id is already taken" })
            }
            else {
                const registerUser = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    accessToken:''
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(registerUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        registerUser.password = hash;
                        registerUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => console.log(err));
                    })
                })
            }
        })
})

router.put('/forgot-password', (req, res) => {
    const { email } = req.body;
    Users.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with this email does not exists." });
        }
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            secure: false,
            auth: {
                user: "giribabu453@gmail.com",
                pass: "babu453@"
            }
        });

        var mailOptions = {
            from: "Fred Foo ✔ <giribabu453@gmail.com>",
            to: email,
            subject: "Reset password OTP ✔",
            text: "Buildease-Service ✔",
            html: `<b>Your OTP  ${OTP}. </b>`
        }


        return user.updateOne({ resetOtp: OTP }, function (err, success) {
            if (err) {
                return res.status(400).json({ error: "reset password error." });
            } else {
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        return res.json({ message: 'Email has been sent, kindly follow instructions' });
                    }
                });

            }
        })
    })
})

router.put('/reset-password', (req, res) => {
    const { resetOtp, newPass } = req.body;
    if (resetOtp) {
        Users.findOne({ resetOtp }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: "User with this otp does not exists." });
            }
            const obj = {
                password: newPass,
                resetOtp: ''
            }

            user = _.extend(user, obj);
            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: "reset password error" });
                } else {
                    return res.status(200).json({ message: 'Your password has been changed' });
                }
            })

        })
    } else {
        return res.status(401).json({ error: "Authentication error!!!" });
    }
})

module.exports = router