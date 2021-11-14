const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    u_email: { type: String },
    r_email: { type: String },
    order_status: { type: String },
    order_type: { type: String },
    delivery_address: { type: String },
    bill: { type: String },
    item: [
        new Schema({
            item_name: { type: String },
            item_price: { type: Number },
            item_qty: { type: String },
        })
    ],
},
{
    versionKey: false,
        timestamps: true
});

const orderModel = mongoose.model('order', usersSchema);
module.exports = orderModel;