"use strict";
var express = require('express');
const Order = require('../Models/Order/OrderModel');

function handle_request(msg, callback) {


    console.log(msg);
    console.log('Inside place order api...');

    let newOrder = new Order({
        u_email: msg.u_email,
        r_email: msg.r_email,
        r_name: msg.r_name,
        order_status: msg.order_status,
        order_type: msg.order_type,
        delivery_address: msg.delivery_address,
        instruction: msg.inst,
        bill: msg.bill,
        item: msg.item
    })

    newOrder.save((err, order) => {
        if (err) {
            console.log(err);
            callback(null, "Error Occured");
        } else {
            // res.writeHead(200, {
            //     'Content-Type': 'text/plain'
            // })
            console.log('Place order response data: ', order);
            console.log("User login api 200 status", order._id)

            callback(null, order);
        }
    });
    console.log("after callback");
}

exports.handle_request = handle_request;