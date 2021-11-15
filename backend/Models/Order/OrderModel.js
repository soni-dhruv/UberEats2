const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ordersSchema = new Schema({
    u_email: { type: String },
    r_email: { type: String },
    r_name: { type: String },
    order_status: { type: String },
    order_type: { type: String }, //delivery mode
    delivery_address: { type: String },
    instruction: { type: String, default: "" },
    bill: { type: String },
    item: [{
        item_name: { type: String },
        item_price: { type: String },
        item_qty: { type: String },
    }],
},
    {
        versionKey: false,
        timestamps: true
    });

const orderModel = mongoose.model('order', ordersSchema);
module.exports = orderModel;