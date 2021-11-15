import React, { Component } from 'react';
import { ReactComponent as Logo } from "../../../images/uber_eats_logo.svg";
import '../../../css/signup.css';
import axios from 'axios';
import { constats } from '../../../ip/config';
import { Redirect, /*Route*/ } from 'react-router';
// import ReactBootstrap from 'react-bootstrap'
// import { DropdownButton } from 'ReactBootstrap';

export default class signup_test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            phone: "",
            address: "",
            city: "",
            authFlag: false,
            message: ""
        };

        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        });
    }
    addressChangeHandler = (e) => {
        this.setState({
            address: e.target.value
        });
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        });
    }
    finalSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
        }

        console.log("before signup");
        //make a post request with the user data
        axios.post(`http://${constats.AWS.ipAddress}:3000/signup`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        message: 'You Are Signed up!!!, Now continue to login.'
                    })
                    console.log("in signup 200: ", this.state.email);// "userType: ", this.state.userType
                    const data1 = {
                        email: this.state.email,
                        // userType: this.state.userType,
                    }
                    this.props.loginuser(data1);
                }
                else if (response.status === 201) {
                    console.log(response.data)
                    this.setState({
                        message: "Email already exsists",
                        authFlag: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    authFlag: false,
                    message: 'Details not Stored'
                })
                console.log(this.state.message);
            });
    }

    render() {
        let HTMLToDisplay = "";
        HTMLToDisplay = HTMLToDisplay = (
            <div className="container">
                <div className="form-group">
                    <form>
                        {/* EMAIL*/}
                        <div className="form-group">
                            <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <h2>User Login</h2>
                                <p>Email(required)</p>
                                <input type="email" required name="emailid"
                                    className="form-control uberEats-input" onChange={this.emailChangeHandler} />
                            </div>
                        </div>

                        {/*Password*/}
                        <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                            <p>Password</p>
                            <input type="password" required name="password" className="form-control uberEats-input"
                                onChange={this.PasswordChangeHandler} />
                        </div>



                        {/*NAME*/}
                        <div className="form-group">
                            <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <p>Name</p>
                                <input type="name" required name="name"
                                    className="form-control uberEats-input" onChange={this.NameChangeHandler} />
                            </div>
                        </div>

                        {/*Phone*/}
                        <div className="form-group">
                            <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <p>Phone Number</p>
                                <input type="phone" required name="phone"
                                    className="form-control uberEats-input" onChange={this.PhoneChangeHandler} />
                            </div>
                        </div>

                        {/* <div class="dropdown">
                        <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                Delivery Type
                            </button>
                            <div class="dropdown-menu">
                                <a className="dropdown-item" href="#">Pickup</a>
                                <a className="dropdown-item" href="#">Delivery</a>
                                <a className="dropdown-item" href="#">Pickup and Delivery</a>
                            </div>
                            </div>
                        </div> */}

                        {/*ADDRESS*/}
                        <div className="form-group">
                            <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <p>Address</p>
                                <input type="address" required name="address"
                                    className="form-control uberEats-input" onChange={this.AddressChangeHandler} />
                            </div>
                        </div>

                        {/*CITY*/}
                        <div className="form-group">
                            <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <p>City</p>
                                <input type="city" required name="city"
                                    className="form-control uberEats-input" onChange={this.CityChangeHandler} />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                    <button onClick={this.finalSubmitted} className="login-button btn btn-primary" type="submit">Submit</button>
                </div>

                <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                    <button onClick={<Redirect to="/login" />} className="login-button btn btn-primary" type="submit">To Login</button>
                </div>
            </div>
        );
        return (
            <div>
                <div className="container py-5 mb-5">
                    <Logo className="col-sm-4 col-lg-6 offset-sm-4 offset-lg-3 mt-5" />
                    {HTMLToDisplay}
                </div>
            </div>
        )
    }
}