const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/Config')

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, config.secret);
        User.findOne({ _id: decoded._id, accessToken: token },
            (err, user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(401).send({ error: "invalid token" });
                }
            });

    } catch (e) {
        if (e.message == "jwt expired") {
            res.status(401).send({ error: "token expired" });
        } else {
            res.status(401).send({ error: "invalid token" });
        }

    }
};



