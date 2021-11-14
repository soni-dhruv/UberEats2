const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    u_email: { type: String },
    r_name: { type: String },
    order_status: { type: String },
    order_type: { type: String },
    address: { type: String },
    bill: { type: Number },
    item: [
        {
            item_name: { type: String },
            item_price: { type: Number },
            item_qty: { type: Number },
        },
    ],
},
    {
        versionKey: false,
        timestamps: true
    });

const orderModel = mongoose.model('order', usersSchema);
module.exports = orderModel;