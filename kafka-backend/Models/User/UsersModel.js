const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String },
    street_address: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: Number },
    country: { type: String },
    menu: [
        {
            item_name: { type: String },
            item_details: { type: String }
        },
    ]
},
    { versionKey: false, timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;