"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const { mongoDB } = require('./Utils/constant');
const mongoose = require('mongoose');
const User = require('../backend/Models/User/UsersModel');
const RestaurantModel = require('../backend/Models/Restaurant/RestaurantModel');
const OrderModel = require('../backend/Models/Order/OrderModel')
// const kafka = require('../backend/kafka/client');
const restaurantModel = require('../backend/Models/Restaurant/RestaurantModel');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

//---------------------------------------------------------------- USER's APIS Starts------------------------------------------//


//KAFKA DONE
//User Login
app.post('/user/login1', (req, res) => {
    console.log(req.body);
    kafka.make_request("login", req.body, function (err, results) {
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again.",
            });
        }
        else {
            console.log("Inside router post");
            console.log(results);
            res.status(200).send(results);
        }
    });
});

// app.post('/user/login', (req, res) => {

// });


app.post('/user/login', (req, res) => {
    // console.log(req.body);
    console.log('Inside login api...');
    User.findOne({ email: req.body.email, password: req.body.password }, (error, user) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occured");
        }
        if (user) {
            res.cookie('UE_user_email', req.body.email, { maxAge: 90000000, httpOnly: false, path: '/' });
            res.cookie('UE_usertype', 'customer', { maxAge: 90000000, httpOnly: false, path: '/' });

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log("User login api 200 status")
            res.end("User login api 200 status");
        }
        else {
            // console.log(user);
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
        }
    });
});





//DONE
//User Signup
app.post('/user/signup', (req, res) => {
    var NewUser = User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city
    });
    User.findOne({ email: req.body.email }, (error, email) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error in 500", error);
        }
        if (email) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("E-mail id already exsits");
        }
        else {
            NewUser.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    console.log("error code 500")
                    res.end();
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("User added successfully!");
                }
            });
        }
    });
});

//User Landing Page Customer
app.get('/user/home', async function (req, res) {
    try {
        RestaurantModel.find({}, { name: 1, email: 1, city: 1, address: 1, delivery_type: 1, food_type: 1 },
            (err, result) => {
                if (err) {
                    console.log("error" + err);
                    res.end({ message: "Email id does not exsist" });
                }
                else {
                    console.log("sorted results: " + finalList);
                    res.end(result);
                }
            }
        )
    }
    catch (e) {
        console.log(e);
    }
});


app.get('/save-new-rest', (req, res) => {

    const newDoc = new RestaurantModel({
        email: 'abc@gmail.com',
        password: 'Abc@123',
        name: 'Panda Express',
        phone: '+11231231231',
        city: 'San Jose',
        delivery_type: 'delivery',
        zip_code: '95112',
        state: 'California',
        menu: [
            {
                category_name: "Starters",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken® Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 11.98,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large French Fry",
                        description: "Crispy, golden fried potatoes",
                        price: 4.24,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Stuffed Jalapenos",
                        description: "Breaded spicy Jalapenos stuffed with blend of melted cheeses, served with Buttermilk Ranch Dipping Sauce upon request",
                        price: 5.74,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Teriyaki Rice Bowl 1",
                        description: "Rice prepared with teriyaki sauce along with soy sauce, water, honey, brown sugar, rice vinegar, sesame oil, ginger, garlic, and cornstarch.",
                        price: 12.74,
                        dish_type: 'vegan'
                    }
                ]
            },
            {
                category_name: "Entrees",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'

                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken® Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 11.98,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large French Fry",
                        description: "Crispy, golden fried potatoes",
                        price: 4.24,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Stuffed Jalapenos",
                        description: "Breaded spicy Jalapenos stuffed with blend of melted cheeses, served with Buttermilk Ranch Dipping Sauce upon request",
                        price: 5.74,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Teriyaki Rice Bowl 2",
                        description: "Rice prepared with teriyaki sauce along with soy sauce, water, honey, brown sugar, rice vinegar, sesame oil, ginger, garlic, and cornstarch.",
                        price: 12.74,
                        dish_type: 'vegan'
                    }
                ]
            }
        ]
    })

    newDoc.save()
        .then((result) => {
            let msg = 'Mongo insert sucessful for customer signup for username: ' + req.body.username + '. Doc id: ' + (result._id).toString();
            console.log(msg);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end((result._id).toString())
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/update-doc111', (req, res) => {
    RestaurantModel.updateOne({ email: req.query.email }, {
        city: 'San Jose',
        password: 'Abc@123',
        name: "Jack in the box",
        delivery_type: 'pickup',
        zip_code: '95112',
        state: 'California',
        phone: '+11231231231',
        menu: [
            {
                category_name: "Starters",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken® Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 11.98,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large French Fry",
                        description: "Crispy, golden fried potatoes",
                        price: 4.24,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Stuffed Jalapenos",
                        description: "Breaded spicy Jalapenos stuffed with blend of melted cheeses, served with Buttermilk Ranch Dipping Sauce upon request",
                        price: 5.74,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Teriyaki Rice Bowl 1",
                        description: "Rice prepared with teriyaki sauce along with soy sauce, water, honey, brown sugar, rice vinegar, sesame oil, ginger, garlic, and cornstarch.",
                        price: 12.74,
                        dish_type: 'vegan'
                    }
                ]
            },
            {
                category_name: "Entrees",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'

                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken® Combo",
                        description: "Bacon Ultimate Cheeseburger™, large French Fries, and your choice of large drink.",
                        price: 11.98,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large French Fry",
                        description: "Crispy, golden fried potatoes",
                        price: 4.24,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Stuffed Jalapenos",
                        description: "Breaded spicy Jalapenos stuffed with blend of melted cheeses, served with Buttermilk Ranch Dipping Sauce upon request",
                        price: 5.74,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Teriyaki Rice Bowl 2",
                        description: "Rice prepared with teriyaki sauce along with soy sauce, water, honey, brown sugar, rice vinegar, sesame oil, ginger, garlic, and cornstarch.",
                        price: 12.74,
                        dish_type: 'vegan'
                    }
                ]
            }
        ]
    })
        .then((result) => {
            if (result) {
                console.log('Update successful. Result: ', result);
            } else {
                console.log('Update failed');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

// User Search Bar
app.get('/user/order', (req, res) => {
    let searchStringRegex = new RegExp(req.query.general_search_string, "i");
    User.find({
        $or: [
            { name: searchStringRegex },
            { city: searchStringRegex },
            { 'menu.category_name': searchStringRegex },
            { 'menu.category_items.item_name': searchStringRegex },
            { 'menu.category_items.dish_type': searchStringRegex }
        ]
    },
        {
            email: 1, name: 1, zip_code: 1, street_address: 1, menu: 1, city: 1,
            delivery_fee: 1, delivery_time: 1, delivery_mode: 1, isFavoriteRest: 1, rating: 1
        }
    )
        .then((result) => {
            if (result) {
                console.log('DATA FOUND: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//User Orders Page
app.get('/user/order', (req, res) => {
    orderModel.find({ u_mail: req.body.email }, { r_name: 1, order_status: 1, order_type: 1, delivery_address: 1, instruction: 1, bill: 1, item: 1 },
        (error, order) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end();
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                console.log(JSON.stringify("Order Data retrived!", order));
                res.end(JSON.stringify("Order placed retrived!", order));
            }
        });
});

app.get('/user/restaurant_suggestions', (req, res) => {
    console.log('GET restaurant_suggestions input request parameters: ', req.query);

    if (req.query.city) {
        console.log('City param received in restaurant_suggestions api input...');
        let citySearchStringRegex = new RegExp(req.query.city, "i");

        RestaurantModel.find({ city: citySearchStringRegex })
            .then((result) => {
                if (result) {
                    console.log('DATA FOUND: ', result);

                    // let result1 = {
                    //     restaurant_id: result._id,
                    //     username: result.username,
                    //     zipcode: result.zipcode,
                    //     restaurant_name: result.name,
                    //     city: result.city,
                    //     delivery_fee: result.delivery_fee,
                    //     delivery_time: result.delivery_time,
                    //     street_address: result.street_address,
                    //     rating: result.rating,
                    //     isFavoriteRest: result.isFavoriteRest
                    // }

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(JSON.stringify(result));
                } else {
                    console.log('NO DATA');
                    res.writeHead(201, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('NO DATA FOUND');
                }
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        let searchStringRegex = new RegExp(req.query.general_search_string, "i");

        // userDetailsModel.find({ $or: [ {name: searchStringRegex}, {city: searchStringRegex}, {'menu.category_name': searchStringRegex}, {'menu.category_items.item_name': searchStringRegex}, {'menu.category_items.dish_type': searchStringRegex} ] }, {username: 1, usertype: 1, name: 1, zipcode: 1, street_address: 1, menu: 1, city: 1, delivery_fee: 1, delivery_time: 1, delivery_mode: 1, isFavoriteRest: 1, rating: 1, _id:1})

        userDetailsModel.find({
            $and: [

                { $or: [{ name: searchStringRegex }, { city: searchStringRegex }, { 'menu.category_name': searchStringRegex }, { 'menu.category_items.item_name': searchStringRegex }, { 'menu.category_items.dish_type': searchStringRegex }] },

                { usertype: 'restaurant' }

            ]
        }, { username: 1, usertype: 1, name: 1, zipcode: 1, street_address: 1, menu: 1, city: 1, delivery_fee: 1, delivery_time: 1, delivery_mode: 1, isFavoriteRest: 1, rating: 1, _id: 1 })
            .then((result) => {
                if (result) {
                    console.log('DATA FOUND: ', result);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(JSON.stringify(result));
                } else {
                    console.log('NO DATA');
                    res.writeHead(201, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(result);
                }
            }).catch((err) => {
                console.log(err);
            })
    }
})

// //Add to Favourite
// app.get('/user/order', (req, res) => {
//     Cust.findOne({ email: email }, (err, cust) => {
//         if (err) {
//             console.log(err);
//             //callback(null, "Error");
//         } else {
//             User.find({      
//                 "rest._id": msg.rest_id
//             }, (err, fav) => {
//                 if (err) {
//                     console.log(err);
//                     //callback(null, "Error");
//                 } else {
//                     if (fav.length > 110) { // ???????????????????????????????????????? why 110 ??????????????????????????????????????
//                         console.log("###############", fav.length);
//                         //callback(null, "Already added to Fav");
//                     } else {
//                         console.log("here if not ", fav.length);
//                         User.rest.push(newFav);
//                         User.save();
//                         //callback(null, cust);
//                     }
//                 }
//             });
//         }
//     });
// });

//Pending
//New Order
app.get('/user/order/new', (req, res) => {
    let u_email = msg.email;
    let r_email = msg.r_email;
    let order_status = "Order Placed";
    let order_type = msg.order_type;
    let address = msg.address;
    let bill = msg.bill;
    let item = msg.item;

    const order = new Order({
        u_email,
        r_email,
        order_status,
        order_type,
        address,
        bill,
        item
    });
});

//Profile Page
app.get('/user/profile', (req, res) => {
    User.find({ email: req.query.email })
        .then((result) => {
            if (result) {
                console.log('DB Result: ', result);
            } else {
                console.log('No data');
            }
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(result));
        })
        .catch((err) => {
            console.log(err);
        })
})

// KAFKA
//Profile Page Update
app.post('/user/profile/update', (req, res) => {
    const filter = { email: msg.email };
    const update = {
        $set: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
        }
    };
    User.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
        if (err) {
            console.log("error");
            callback(null, "error");
        } else {
            callback(null, result);
        }
    });
});

//Receipt

//-----------------------------------------------------------------------------//
//User Favourite Restaurant Page
app.get('/user/favourite', (req, res) => {
    User.find({ email: req.body.email }, (error, favourite) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(JSON.stringify("Favourite Data got", favourite));
            res.end(JSON.stringify("Favourite Data got", favourite));
        }
    });
});
//-----------------------------------------------------------------------------//
//---------------------------------------------------------------- USER's APIS Ends --------------------------------------------------//

//---------------------------------------------------------------- Restaurant's APIS Starts ------------------------------------------//

//Restaurant Login
app.post('/restaurant/login', (req, res) => {
    // console.log(req.body);
    RestaurantModel.findOne({ email: req.body.email, password: req.body.password }, (error, user) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occured");
        }
        if (user) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log("Restaurant login api 200 status")
            res.end("Restaurant login api 200 status");
        }
        else {
            // console.log(user);
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
        }
    });
});

//Restaurant Signup
app.post('/restaurant/signup', (req, res) => {
    var NewRestaurant = RestaurantModel({
        // restaurant_id: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: String }
    });

    // RestaurantModel.find({ email: msg.email }, (err, result) => {
    //     if (result) {
    //         console.log(result);
    //         //res.end(201, "You already have an account with Uber Eats")
    //         callback(null, "You already have an account with Uber Eats");
    //     }
    //     else {
    //         RestaurantModel.save((err, result) => {
    //             if (err) {
    //                 console.log("error is: " + err);
    //                 callback(null, "Something went wrong. Please try again later");
    //                 //res.status(500).send();
    //             }
    //             else {
    //                 console.log("result=" + result);
    //                 const payload = {
    //                     id: result._id,
    //                     username: msg.name,
    //                     email: msg.email
    //                 };
    //                 const token = jwt.sign(payload, secret);
    //                 callback(null, "JWT " + token);
    //             }
    //         });
    //     }

    RestaurantModel.findOne({ email: req.body.email }, (error, email) => {
        console.log("email:", req.body.email);
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error in 500", error);
        }
        if (email) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("E-mail id already exsists");
        }
        else {
            NewRestaurant.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    console.log("Error code 500");
                    res.end();
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("User Added Successfully")
                }
            })
        }
    });
})

//Restaurant Home
app.post('/restaurant/home', (req, res) => {
    RestaurantModel.find({ 'email': req.body.email }, { menu: 1 })
        .then((result) => {
            if (result) {
                console.log('Results: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Restaurant Add Menu
app.post('/restaurant/addmenu', (req, res) => {
    RestaurantModel.findOneAndUpdate({ email: req.body.email },
        {
            $push: {
                category_items: [
                    new Schema({
                        //  item_id: {type: Number},
                        item_name: { type: String },
                        description: { type: String },
                        price: { type: Number },
                        dish_type: { type: String } //Veg || Non Veg
                    })
                ]
            }
        },
        (err, result) => {
            if (err) {
                console.log(err);
                callback(null, "Error");
                // console.log(err);
            } else {
                // console.log(result);
                callback(null, result);
            }
        }
    );
})
//-----------------------------------------------------------------------------
//Restaurant Update Menu Price
app.post('/restaurant/menu/update', (req, res) => {
    RestaurantModel.findOneAndUpdate({ 'email': req.body.email, 'item_name': req.body.item_name }, { 'price': req.body.price }, { new: true })
        .then((result) => {
            if (result) {
                console.log('Results: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
//-----------------------------------------------------------------------------
//DONE
//Restaurant Orders
app.post('/restaurant/order', (req, res) => {
    OrderModel.findOne({ 'r_email': req.body.email }, { _id: 1 })
        .then((result) => {
            if (result) {
                console.log('Results: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//DONE
//Restaurant Order Status Update
app.post('/restaurant/order/update', (req, res) => {
    OrderModel.findOneAndUpdate({ 'r_email': req.body.r_email, u_email: req.body.u_email }, { 'order_status': req.body.order_status }, { new: true })
        .then((result) => {
            if (result) {
                console.log('Results: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//---------------------------------------------------------------- Restaurant's APIS Ends ------------------------------------------//

//---------------------------------------------------------------- Test API's starts -----------------------------------------------//

app.post('/test', (req, res) => {
    OrderModel.create({
        u_email: req.body.u_email,
        r_email: req.body.r_email,
        order_status: req.body.order_status,
        order_type: req.body.order_type,
        delivery_address: req.body.delivery_address,
        bill: req.body.bill,
        // item: [
        //     new Schema({
        //         item_name: req.body.item_name,
        //         item_price: req.body.item_price,
        //         item_qty: req.body.item_qty
        //     })
        // ]
    })
        .then((result) => {
            if (result) {
                console.log('Results: ', result);
            } else {
                console.log('NO DATA');
            }
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

})


//---------------------------------------------------------------- Test API's ENDS -------------------------------------------------//

app.listen(3001, () => console.log("Server Listening on port 3001"));