"use strict";
var express = require('express');
const OrderModel = require('../../Models/Order/OrderModel');

function handle_request(msg, callback) {
    OrderModel.create(
        { u_mail: msg.u_mail, r_email: msg.r_email,  r_name: msg.r_name, order_status: "Order Placed", "delivery_type": msg.delivery_type, },
        (error, user) => {
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