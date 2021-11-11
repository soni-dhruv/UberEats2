const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    order_item_id: { type: String, required: true },
    order_id: { type: String, required: true },
},
    {
        versionKey: false
    });

const userModel = mongoose.model('user_order_item', usersSchema);
module.exports = userModel;