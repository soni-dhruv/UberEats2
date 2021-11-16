const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restroSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    street_address: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
    delivery_type: { type: String }, // delivery || pickup || delivery and pickup
    menu: [
        new Schema({
            category_name: {type: String},
            category_items: [
                new Schema({
                    //  item_id: {type: Number},
                    item_name: { type: String },
                    description: { type: String },
                    price: { type: Number },
                    dish_type: { type: String }
                })
            ]
        })
    ],
    // order: [
    //     {
    //         _id: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "order",
    //         },
    //     },
    // ],
},
    {
        versionKey: false,
        timestamps: true
    });

const restaurantModel = mongoose.model('Restaurant', restroSchema);
module.exports = restaurantModel;