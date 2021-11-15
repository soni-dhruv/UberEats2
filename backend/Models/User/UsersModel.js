const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String }
},
    {
        versionKey: false, timestamps: true
    });

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;