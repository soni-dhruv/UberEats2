"use strict";
var express = require('express');
const User = require('../Models/User/UsersModel');

function handle_request(msg, callback) {
    const filter = { email: msg.email };
    const update = {
        $set: {
            email: msg.email,
            name: msg.name,
            phone: msg.phone,
            address: msg.address,
            city: msg.city,
        }
    };
    User.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
        if (err) {
            console.log("error");
            callback(null, "error");
        } else {
            callback(null, result);
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;