import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import login from './components/Authenticate/Login/login';
import signup_test from './components/Authenticate/Signup/signup_test';

import userhome from './components/User/userhome';
import Orders from './components/User/Orders';
import menu from './components/User/menu';
import profile from './components/User/profile';
import favourites from './components/User/favourites';
import checkout from './components/User/checkout';
import Logout from './components/Logout';

import addmenu from './components/Restaurant/addmenu';
import editmenu from './components/Restaurant/editmenu';
import restrohome from './components/Restaurant/restrohome';
import restrorders from './components/Restaurant/restrorders';
import restrologin from './components/Restaurant/restrologin';
import restrosignup from './components/Restaurant/restrosignup';
import Navbar from './components/Navbar';
import CustomerRestaurant from './components/User/CustomerRestaurant';

//Create a Main Component
class Main extends Component {
    render() {//CustomerRestaurant
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={login} />
                <Route path="/signup" component={signup_test} />
                {/* <Route path="/signup/name" component={signup_test} /> */}
                <Route path="/userhome" component={userhome} />
                <Route path="/userorder" component={Orders} />
                <Route path="/menu" component={menu} />
                <Route path="/profile" component={profile} />
                <Route path="/favourites" component={favourites} />
                <Route path="/checkout" component={checkout} />
                <Route path="/customer/restaurant" component={CustomerRestaurant} />

                <Route path="/restaurant/login" component={restrologin} />
                <Route path="/restaurant/signup" component={restrosignup} />
                <Route path="/restaurant/menu/edit" component={editmenu} />
                <Route path="/restaurant/home" component={restrohome} />
                <Route path="/restaurant/orders" component={restrorders} />
                <Route path="/logout" component={Logout} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;