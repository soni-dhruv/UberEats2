import React, { Component } from 'react';
// import '../src/App.js';
import '../../../App'
//import './CSS/login.css';
import axios from 'axios';
import cookie from 'react-cookies';
import Cookies from "js-cookie";
import { Redirect, Route } from 'react-router';
//import Home from './Home';
import { Link } from 'react-router-dom';
import '../../../css/login.css'
import { ReactComponent as Logo } from "../../../images/uber_eats_logo.svg";
import { constats } from '../../../ip/config.js';
// import {ReactComponent as Logo} from './images/uber-eats-logo.svg';


//Define a Login Component
class Login extends Component {
    //call the constructor method - it will simply initalize the state
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            userType: "", //either restaurant or customer
            authFlag: false, //will be true if the user is authenticated
            message: "" //message to be shown for the corresponding statusCode
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post(`http://${constats.AWS.ipAddress}:3001/user/login`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                    })
                    console.log('COOKIE UE_user_email: ', Cookies.get('UE_user_email'));
                    console.log('Login sucesfully done');
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    authFlag: false,
                    message: 'Invalid Credentials'
                })

            });
    }

    render() {
        
        //redirect based on successful login
        let redirectVar = null;
        // console.log("this.state.userType: ", this.state.userType)
        // if (cookie.load('cookie')) {
        //     if (this.state.userType === "customer") {
        //         console.log("customer");
        //         redirectVar = <Redirect to="/home" />
        //     }
        //     else {
        //         console.log("rest");
        //         redirectVar = <Redirect to="/restroHome" />
        //     }
        // }

        if (Cookies.get('UE_user_email') && Cookies.get('UE_usertype') === 'customer') {
            console.log("customer");
            redirectVar = <Redirect to="/userhome" />
        } else if (Cookies.get('UE_user_email') && Cookies.get('UE_usertype') === 'restaurant') {
            console.log("restaurant");
            redirectVar = <Redirect to="/restaurant/restroHome" />
        }
        return (
            // the main container that is returned
            <div>
                {redirectVar}
                {/* the container that encompasses the content */}
                <div className="container py-5">
                    <Logo className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3" />
                    <div className="login-form">
                        <div className="main-div ">
                            {/* the logo */}
                            {/* <div class="login-logo text-center"><Logo /></div> */}
                            {/* the message for welcome back */}
                            <div className="panel col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <h2>Welcome back Customer</h2>
                                <p>Sign in with your email address</p>
                                <h3>
                                    {this.state.message}
                                </h3>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                    <input required="required" onChange={this.emailChangeHandler} type="text" className="form-control" name="email" placeholder="Email address" />
                                </div>

                            </div>
                            <div className="form-group">
                                <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                    <input required="required" onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" />
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <button onClick={this.submitLogin} className="login-button btn btn-primary">Login</button>
                            </div>
                            {/* New to Uber/Create an account section */}
                            <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3 text-center mt-2">
                                New  Customer to UberEats? <Link to="/signup" className="link-color" >Create an account!</Link>
                            </div>
                            <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3 text-center mt-2">
                                Are you restaurant? <Link to="/signup" className="link-color" >Login here</Link>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         loginuser: payload => dispatch(loginuser(payload))

//     }
// }

export default Login;
//export default connect(null, mapDispatchToProps)(Login); //redux