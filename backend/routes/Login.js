"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/constant.js');
const userModel = require('../Models/UserModel');
const { auth } = require("../Utils/passport.js");
auth();

//Route to handle Post Request Call
router.post('/login', (req, res) => {
    userModel.findOne({ email: req.email.username, password: req.body.password }, (error, user) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (user) {
            const payload = { _id: user._id, email: user.email };
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            res.status(200).end("JWT " + token);
        }
        else {
            res.status(401).end("Invalid Credentials");
        }
    });
});

module.exports = router;