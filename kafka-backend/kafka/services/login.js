"use strict";
var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var cors = require('cors');
// const { mongoDB } = require('./Utils/constant');
// const mongoose = require('mongoose');
const User = require('../../Models/User/UsersModel');
// const RestaurantModel = require('../backend/Models/Restaurant/RestaurantModel');
// const kafka = require('../backend/kafka/client');

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