import React, {Component}   from 'react';
import {Route}              from 'react-router-dom';

import login                from './components/Authenticate/Login/login';
import signup               from './components/Authenticate/Signup/signup';

import userhome             from './components/User/userhome';
import userorder            from './components/User/userorder';
import menu                 from './components/User/menu';
import profile              from './components/User/profile';
import favourites           from './components/User/favourites';
import checkout             from './components/User/checkout';

import addmenu              from './components/Restaurant/addmenu';
import editmenu             from './components/Restaurant/editmenu';
import restrohome           from './components/Restaurant/restrohome';
import restrorders          from './components/Restaurant/restrorders';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* { <Route path="/" component={Navbar}/> } */}
                <Route path="/login"        component={login}/>
                <Route path="/signup"       component={signup}/>
                <Route path="/userhome"     component={userhome}/>
                <Route path="/userorder"    component={userorder}/>
                <Route path="/menu"         component={menu}/>
                <Route path="/profile"      component={profile}/>
                <Route path="/favourites"   component={favourites}/>
                <Route path="/checkout"     component={checkout}/>
                <Route path="/addmenu"      component={addmenu}/>
                <Route path="/editmenu"     component={editmenu}/>
                <Route path="/restrohome"   component={restrohome}/>
                <Route path="/restrorders"  component={restrorders}/>              
            </div>
        )
    }
}
//Export The Main Component
export default Main;