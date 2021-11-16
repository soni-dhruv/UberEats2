"use strict";
var express = require('express');
const User = require('../Models/User/UsersModel');

function handle_request(msg, callback) {


    // console.log("trying to update " + req.body.city);
    // const filter = { email: req.body.email };
    // const update = {
    //     $set: {
    //         email: req.body.email,
    //         name: req.body.name,
    //         phone: req.body.phone,
    //         address: req.body.address,
    //         city: req.body.city,
    //     }
    // };
    // User.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
    //     if (err) {
    //         console.log("error");
    //         res.status(500).send(err);
    //         //callback(null, "error");
    //     } else {
    //         console.log(result);
    //         res.status(200).send(result);
    //         //callback(null, "error");
    //     }
    // });




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
            console.log(result);
            callback(null, result);
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;