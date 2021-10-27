// import React, { Component } from 'react'

// export class signup extends Component {
//     render() {
//         return (
//             <div>
//                 Welcome to signup page.
//             </div>
//         )
//     }
// }

// export default signup


import React, { Component } from 'react';
import '../../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
//import Cookies from "js-cookie";
import { Redirect, /*Route*/ } from 'react-router';
//import Home from './Home';
import { CountryDropdown } from 'react-country-region-selector';
import { connect } from 'react-redux';
import { loginuser } from './redux/actions';
import { constats } from '../../../ip/config';


//Define a Login Component
class Signup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userType: "",
            deliveryType: "",
            contact: "",
            zipCode: "",
            streetAddress: "",
            city: "",
            country: "",
            authFlag: false,
            message: ""
        }
        //Bind the handlers to this class

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
        this.deliveryTypeChangeHandler = this.deliveryTypeChangeHandler.bind(this);
        this.contactChangeHandler = this.contactChangeHandler.bind(this);
        this.zipCodeChangeHandler = this.zipCodeChangeHandler.bind(this);
        this.streetAddressChangeHandler = this.streetAddressChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);

        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //firstName change handler to update state variable with the text entered by the user
    firstNameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    //lastName change handler to update state variable with the text entered by the user
    lastNameChangeHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
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
    //User type change handler to update state variable with the text entered by the user
    userTypeChangeHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            userType: e.target.value
        })
    }

    deliveryTypeChangeHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            deliveryType: e.target.value
        })
    }


    //Contact change handler to update state variable with the text entered by the user
    contactChangeHandler = (e) => {
        this.setState({
            contact: e.target.value
        })
    }
    //Zip Code change handler to update state variable with the text entered by the user
    zipCodeChangeHandler = (e) => {
        this.setState({
            zipCode: e.target.value
        })
    }
    //Street Address change handler to update state variable with the text entered by the user
    streetAddressChangeHandler = (e) => {
        this.setState({
            streetAddress: e.target.value
        })
    }
    //City change handler to update state variable with the text entered by the user
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    //Country change handler to update state variable with the text entered by the user
    countryChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        //var headers = new Headers();

        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType,
            deliveryType : this.state.deliveryType,
            contact: this.state.contact,
            zipCode: this.state.zipCode,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            country: this.state.country
        }

        console.log("before signup");
        //make a post request with the user data
        axios.post(`http://${constats.AWS.ipAddress}:3001/signup`, data)
            .then(response => {

                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        message: 'You Are Signed up!!!, Now continue to login.'
                    })
                    console.log("in signup 200: ", this.state.email, "userType: ", this.state.userType);
                    const data1 = {
                        email: this.state.email,
                        userType: this.state.userType,
                    }
                    this.props.loginuser(data1);
                }
                else if(response.status === 201){
                    console.log(response.data)
                    this.setState({
                        message : "Email already exsists",
                        authFlag : false
                    })

                    console.log("Status Code Now: ", this.state.username);

                    //this.props.loginuser(this.state.username);
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
        let SignupForm = <div className="container" id="user-profile-details-form">

            <br />
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Restaurant Name:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.firstNameChangeHandler} className="form-control" id="firstName" placeholder="Name" name="firstName" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Owner Name:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.lastNameChangeHandler} className="form-control" id="firstName" placeholder="optional" name="lastName" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-4">
                    <input type="email" onChange={this.emailChangeHandler} className="form-control" id="email" placeholder="Email" name="email" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Password:</label>
                <div className="col-sm-4">
                    <input type="password" onChange={this.passwordChangeHandler} className="form-control" id="password" placeholder="Password" name="password" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="userType">You are a ?</label>
                <div className="col-sm-4">

                <input type="radio" id="customer" name="userType" value="customer" onClick={this.userTypeChangeHandler}/>
                <label for="customer">Customer</label>
                <input type="radio" id="restaurant" name="userType" value="restaurant" onClick={this.userTypeChangeHandler}/>
                <label for="customer">Restaurant Owner</label>            

            </div>
            </div>
            <br />
            <br />


            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="deliveryType">Delivery Type:</label>
                <div className="col-sm-4">
                    <input type="deliveryType" onChange={this.deliveryTypeChangeHandler} className="form-control" id="deliveryType" placeholder="Pickup / Delivery" name="deliveryType" required />
                </div>
            </div>
            <br />
            <br />


            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="contact">Contact:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.contactChangeHandler} className="form-control" id="contacat" placeholder="Contact number" name="contact" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="zipCode">Zip Code:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.zipCodeChangeHandler} className="form-control" id="zipCode" placeholder="Zip Code" name="zipCode" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="streetAddress">Street Address:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.streetAddressChangeHandler} className="form-control" id="city" placeholder="Street Address" name="streetAddress" required />
                </div>
            </div>
            <br />
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="city">City:</label>
                <div className="col-sm-4">
                    <input type="text" onChange={this.cityChangeHandler} className="form-control" id="city" placeholder="City" name="city" required />
                </div>
            </div>
            <br />

            <br />
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="country">Country:</label>
                <div className="col-sm-4">
                    {<CountryDropdown
                        value={this.state.country}
                        onChange={(val) => this.selectCountry(val)} />
                    }
                    {/*onChange = {this.countryChangeHandler}*/}
                </div>
            </div>
            <br />
            <div className="form-group">
                <div className="col-sm-4">
                    <br />
                    <button onClick={this.submitSignup} className="btn btn-primary">Submit</button>
                </div>
            </div>
            <br />
        </div>;

        return (<div className="container">
            <h2>Signup Here</h2>
            <h5>
            {this.state.message}
            </h5>
            {SignupForm}
            

        </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginuser: payload => dispatch(loginuser(payload))

    }
}

//export Signup Component
export default connect(null, mapDispatchToProps)(Signup);