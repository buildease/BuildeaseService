const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/Config')
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const _ = require('lodash');

exports.login = function (req, res, next) {
    User.findOne({ email: req.body.email },
        (err, user) => {
            if (user) {
                const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: config.tokenLife });
                const refreshToken = jwt.sign({ _id: user._id }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
                user.accessToken = token;
                user.refreshToken = refreshToken;
                user.save((err) => {
                    if (err) {
                        res.send({ "Message": "error occured", "Success": false });
                    } else {
                        res.send({ "Success": true, "User": user });
                    }
                });

            } else {
                res.send({ "Message": "No user exists", "Success": false });
            }
            if (err) {
                res.send({ "Message": "error occured", "Success": false });
            }
        });
};

exports.register = function (req, res, next) {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(404).json({ "email": "Email Id is already taken" })
            }
            else {
                const registerUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    accessToken: ''
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
}

exports.forgotPassword = function (req, res, next) {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with this email does not exists." });
        }
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
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
}

exports.resetPassword = function (req, res, next) {
    console.log(req.body, "body");
    const { resetOtp, newPass } = req.body;
    console.log(req.body.password, "password");
    if (resetOtp) {
        User.findOne({ resetOtp }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: "User with this otp does not exists." });
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.newPass, salt, (err, hash) => {
                    if (err){
                        console.log(err)
                        return res.status(400).json({ error: "reset password error"})
                    } 
                    user.password = hash;
                    user.resetOtp = '';
                    user
                        .save()
                        .then((user) =>{return res.status(200).json({ message: 'Your password has been changed' })})
                        .catch((err) =>{return res.status(400).json({ error: "reset password error" })});
                })
            })
        })
    } else {
        return res.status(401).json({ error: "Authentication error!!!" });
    }
}

exports.deleteUser = function (req, res, next) {
    User.deleteOne({ _id: req.params.userId }, (err, user) => {
        if (user.deletedCount == 0) {
            res.send({ "Success": false, "Message": "Not Deleted" });
        }

        if (user.deletedCount != 0) {
            res.send({ "Success": true });
        }

        if (err) {
            res.send({ "Success": false });
        }

    });

}

exports.updateUser = function (req, res, next) {
    console.log(req.body)
    const user = new User(req.body);
    User.updateOne({ _id: req.body.userId }, {
        name: user.name, "email": user.email
    }, function (err, affected, resp) {
        if (err) {
            res.send({ success: false });
        } else if (affected.nModified != 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false, message: "User Not Updated !!" });
        }

    });
}

exports.hi = function (req, res) {
    res.send({ "Message": "Failure" });
}


exports.refreshToken = function (req, res) {
    // refresh the damn token
    const postData = req.body
    User.findOne({ "userId": req.body.userId }, (err, user) => {
        try {
            if (user) {
                const decode = jwt.verify(user.refreshToken, config.refreshTokenSecret);
                const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: config.tokenLife });
                user.token = token;
                User.updateOne({ "userId": req.body.userId }, { "accessToken": token }, function (err, affected, resp) {
                    if (err) {
                        res.send({ "Success": false, "Message": "Error Occured" });
                    } else {
                        res.send({ "Success": true, "token": token });
                    }
                });

            }
            if (err) {
                res.send({ "Success": false, "Message": "No user exists" });

            }
        } catch (e) {

            if (e.message == "jwt expired") {
                res.send({ "Success": false, "Message": "Refresh token expired" });
            }
            else {
                res.send({ "Success": false, "Message": "Error Occured" });
            }
        }

    });
}

exports.myRefreshToken = function (req, res, next) {
    User.findOne({ "userId": req.body.userId }, (err, user) => {
        if (user) {
            res.send({ "Success": true, "refreshToken": user.refreshToken });
        }
        if (err) {
            res.send({ "Success": false, "Message": "Error Occured" });
        }
    });

}





