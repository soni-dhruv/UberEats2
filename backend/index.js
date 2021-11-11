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
const kafka = require('../backend/kafka/client');

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
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
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

//User Login
app.post('/user/login', (req, res) => {
    console.log(req.body);
    kafka.make_request("test", req.body, function (err, results) {
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again.",
            });
        } else {
            console.log("Inside router post");
            console.log(results);
            res.status(200).send(results);
        }
    });
});

//User Signup
app.post('/user/signup', (req, res) => {
    var NewUser = User({
        email: req.body.email,
        password: req.body.password,
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
                    res.end("User added successfully!!!!!");
                }
            });
        }
    });
});

// //User Landing Page Customer
app.get('/user/home', async function (req, res) {
    Cust.findOne({ email: msg.email }, (err, result) => {
        if (result) {
            console.log("found restlist");
            Rest.find({})
                .exec((err, res) => {
                    if (err) {
                        console.log(err);
                        callback(null, "Customer does not exisits12121")
                    } else {
                        res.forEach(function (element) {
                            element.pincode = Math.abs(element.pincode - 12120);
                        });

                        res.sort((a, b) => a.pincode - b.pincode);
                        callback(null, JSON.stringify(res));
                    }
                });

        } else {
            console.log(err);
            callback(null, "Customer does not exisits")
        }
    });
});

// User Search Bar
app.get('/user/order', (req, res) => {
    let searchStringRegex = new RegExp(req.query.general_search_string, "i");
    User.find({
        $or: [{ name: searchStringRegex },
        { city: searchStringRegex },
        { 'menu.category_name': searchStringRegex },
        { 'menu.category_items.item_name': searchStringRegex },
        { 'menu.category_items.dish_type': searchStringRegex }]
    },
        {
            username: 1, usertype: 1, name: 1, zipcode: 1, street_address: 1, menu: 1, city: 1,
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
    orderModel.find({ email: req.body.email }, (error, order) => {
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
            console.log(JSON.stringify("Order Data got", order));
            res.end(JSON.stringify("Order Data got", order));
        }
    });
});

//Add to Favourite
app.get('/user/order', (req, res) => {
    Cust.findOne({ email: email }, (err, cust) => {
        if (err) {
            console.log(err);
            //callback(null, "Error");
        } else {
            User.find({
                "rest._id": msg.rest_id
            }, (err, fav) => {
                if (err) {
                    console.log(err);
                    //callback(null, "Error");
                } else {
                    if (fav.length > 110) { // ???????????????????????????????????????? why 110 ??????????????????????????????????????
                        console.log("###############", fav.length);
                        //callback(null, "Already added to Fav");
                    } else {
                        console.log("here if not ", fav.length);
                        User.rest.push(newFav);
                        User.save();
                        //callback(null, cust);
                    }
                }
            });
        }
    });
});

//New Order 
app.get('/user/order/new', (req, res) => {
    let u_email = msg.email;
    let r_email = msg.rest_id;
    let order_status = msg.order_status;
    let order_type = msg.order_type;
    let address = msg.address;
    let total_cost = msg.total_cost;
    let item = msg.item;

    const order = new Order({
        u_email,
        r_name,
        order_status,
        order_type,
        address,
        total_cost,
        item
    });

});

//Profile Page
app.get('/user/profile', (req, res) => {
    User.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            console.log("error")
        } else {
            callback(null, result)
        }
    });
    // callback(null,results);
    console.log("after callback");
})

//Receipt

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

//---------------------------------------------------------------- USER's APIS Ends--------------------------------------------------//

//---------------------------------------------------------------- Restaurant's APIS Starts------------------------------------------//

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
            // console.log("get user email",user);
            // res.cookie('cookie', customer_users.email, { maxAge: 900000, httpOnly: false, path: '/' });
            //req.session.User = User;
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

    RestaurantModel.findOne({ email: req.body.email }, (error, email) => {
        console.log("Email:", req.body.email);
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
    Cust.findOneAndUpdate(
        { username: msg.username },
        {
            contact: msg.contact,
            fname: msg.fname,
            lname: msg.lname,
            // pincode: msg.pincode,
            // add1: msg.add1,
            // add2: msg.add2,
            // city: msg.city,
            // state: msg.state,
            // country: msg.country,
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

//Restaurant Update Menu Price
app.get('/restaurant/meu/update', (req, res) => {
    userDetailsModel.updateOne({ email: req.body }, { item_price: req.body.item_price })
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

//Restaurant Orders
app.post('/restaurant/order', (req, res) => {
    OrderModel.find({ 'email': req.body.email }, {})
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


//Restaurant Order Status Update
app.post('/restaurant/order/update', (req, res) => {
    OrderModel.findOneAndUpdate({ 'email': req.body.email }, { 'order_status': req.body.order_status })
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
    RestaurantModel.updateOne({ email: req.body.email }, {
        menu: [
            {
                //category_name: "Picked for you",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'
                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™️, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken®️ Combo",
                        description: "Bacon Ultimate Cheeseburger™️, large French Fries, and your choice of large drink.",
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
                //category_name: "Featured Items",
                category_items: [
                    {
                        item_name: "Large Curly Fry",
                        description: "Seasoned, curly-cut fried potatoes",
                        price: 4.49,
                        dish_type: 'veg'

                    },
                    {
                        item_name: "Large Bacon Ultimate Cheeseburger Combo",
                        description: "Bacon Ultimate Cheeseburger™️, large French Fries, and your choice of large drink.",
                        price: 12.35,
                        dish_type: 'non_veg'
                    },
                    {
                        item_name: "Large Jack's Spicy Chicken®️ Combo",
                        description: "Bacon Ultimate Cheeseburger™️, large French Fries, and your choice of large drink.",
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


//---------------------------------------------------------------- Test API's ENDS -------------------------------------------------//

app.listen(3001, () => console.log("Server Listening on port 3001"));