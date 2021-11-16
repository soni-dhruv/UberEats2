"use strict";
var express = require('express');
const User = require('../Models/User/UsersModel');

function handle_request(msg, callback) {
    User.findOne({ email: msg.email, password: msg.password }, (error, user) => {
        if (error) {
            callback(null, "Error Occured");
        }
        if (user) {
            console.log("login api 200 status")
            callback(null, "login api 200 status");
        } 
        
        else {

            callback(null, "Invalid Credentials");
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;