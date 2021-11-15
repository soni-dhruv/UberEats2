import Cookies from "js-cookie";
import React, { Component } from "react";
import axios from 'axios';
import { constats } from '../../ip/config';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log('Inside constructor');
        this.state = {
            profile: "",
            email: "",
            name: "",
            phone: "",
            address: "",
            city: ""
        };

        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Inside did mount");
        const data = {
            email: Cookies.get('UE_user_email')
        }
        console.log(data.email)
        axios.post(`http://${constats.AWS.ipAddress}:3001/user/profile`, data)
            .then((response) => {
                console.log('Profile details API Response data: ', response.data)
                this.setState({
                    profile: response.data,
                    email: response.data.email,
                    city: response.data.city,
                    name: response.data.name,
                    phone: response.data.phone,
                    address: response.data.address
                }, () => {
                    console.log("profile data is: " + JSON.stringify(this.state.email));
                });

                
            }).catch(function (e) {
                console.error(e.message);
            });
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    addressChangeHandler = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("will make an axios call here");
        console.log("updated city: " + this.state.city);
        const data = {
            email: this.state.email,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city
        }
        console.log(data.email)
        axios.post(`http://${constats.AWS.ipAddress}:3001/user/profile/update`, data)
            .then((response) => {
                console.log('Update Profile details API Response data: ', response.data)
                this.setState({
                    profile: response.data
                }, () => {
                    console.log("profile data is: " + JSON.stringify(this.state.profile));
                });

                
            }).catch(function (e) {
                console.error(e.message);
            });
    }

    render() {
        let profileForm = <div className="container" id="user-profile-details-form">
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                <div className="col-sm-3">
                    <input type="text" onChange={this.nameChangeHandler} className="form-control" id="name" placeholder="Name" name="name" value={this.state.profile.name} />
                </div>
            </div>
            <br />

            {/* <div className="form-group">
                <div className="col-xs-6">
                    <label for="address">
                        <h4>Address Line 1</h4>
                    </label>
                    <input type="text" className="form-control" value={this.state.add1}
                        onChange={this.add1ChangeHandler} name="add1" id="add1"
                        placeholder="enter street, apt" />
                </div>
            </div> */}

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-3">
                    <input type="email" onChange={this.emailChangeHandler} className="form-control" id="email" placeholder="Email" name="email" value={this.state.profile.email} />
                </div>
            </div>
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="contact">Phone:</label>
                <div className="col-sm-3">
                    <input type="text" onChange={this.phoneChangeHandler} className="form-control" id="phone" placeholder="Phone" name="phone" value={this.state.profile.phone} />
                </div>
            </div>
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="address">Address:</label>
                <div className="col-sm-3">
                    <input type="text" onChange={this.addressChangeHandler} className="form-control" id="city" placeholder="Address" name="address" value={this.state.profile.address} />
                </div>
            </div>
            <br />

            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="city">City:</label>
                <div className="col-sm-3">
                    <input type="text" className="form-control" id="city" placeholder="City" onChange={this.cityChangeHandler} name="city" defaultValue={this.state.profile.city} />
                </div>
            </div>
            <br />

            <button className="btn btn-outline-primary" type="submit" onClick={this.handleSubmit}> Update </button>
            <br /><br /><br />
            <br />
        </div>;

        return (<div className="container">
            <h2>Profile Page</h2>
            <p><b><i>Hello {this.state.profile.name},</i></b></p>
            {profileForm}
        </div>);
    }
}

export default Profile