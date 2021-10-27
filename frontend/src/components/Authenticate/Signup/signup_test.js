import React, { Component } from 'react';
import {ReactComponent as Logo} from "../../../images/uber_eats_logo.svg";
import '../../../css/signup.css';
import axios from 'axios';
import { constats } from '../../../ip/config';


export default class signup_test extends Component {

    constructor(props){
        super(props);

        this.state={
            email: "",
            first_name: "",
            last_name: "",
            password:"",
            emailPageFlag: true,
            NamePageFlag: false,
            PasswordPageFlag: false,
            authFlag: false,
            message: ""
        };  
        
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.emailSubmitted = this.emailSubmitted.bind(this);
        this.FirstNameChangeHandler = this.FirstNameChangeHandler.bind(this);  
        this.SecondNameChangeHandler = this.SecondNameChangeHandler.bind(this);
        this.PasswordNameChangeHandler = this.PasswordNameChangeHandler.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
    }

    emailChangeHandler = (e)=> {

        this.setState({
            email: e.target.value
        });
    };

    emailSubmitted = () => {
        //email validation
        if(this.state.email === ""){
            // console.log("please enter a valid email");
        }
        else {
            this.setState({
                emailPageFlag: false,
                NamePageFlag: true
            });
            // console.log("changing flags after submitting emails")
        }
    }

    FirstNameChangeHandler = (e) => {
        this.setState({
            first_name: e.target.value
        });
    }

    SecondNameChangeHandler = (e) => {
        this.setState({
            last_name: e.target.value
        });
    }

    nameSubmitted = () => {
        this.setState(
            {
                NamePageFlag: false,
                PasswordPageFlag: true
            }
        );
    }

    PasswordNameChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    finalSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            email: this.state.email,
            password: this.state.password
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
                    console.log("in signup 200: ", this.state.email);//, "userType: ", this.state.userType
                    const data1 = {
                        email: this.state.email,
                        // userType: this.state.userType,
                    }
                    this.props.loginuser(data1);
                }
                else if(response.status === 201){
                    console.log(response.data)
                    this.setState({
                        message : "Email already exsists",
                        authFlag : false
                    })

                    // console.log("Status Code Now: ", this.state.username);

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
        
        let HTMLToDisplay = "";
        if(this.state.emailPageFlag)
        {
            HTMLToDisplay = 
            (<div>
                <div className="container py-5">
                <form>
                    <div className="form-group">
                        <div className="panel mb-4 col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                                <h2>Let's get started</h2>
                                <p>Enter your email number(required)</p>
                                <h3>
                                    {this.state.message}
                                </h3>
                        {/* </div>
                        <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3"> */}
                                {/* <input type="text" onChange={this.emailChangeHandler} className="form-control" id="firstName" placeholder="optional" name="lastName" required /> */}
                            <input type="email" required name="emailid" placeholder="Enter your email" className="form-control uberEats-input" onChange={this.emailChangeHandler} />
                        </div>
                    </div>
                </form>
                <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                    <button onClick={this.emailSubmitted} className="login-button btn btn-primary" type="submit">Next</button>
                </div>
                
                </div>
            </div>);
        }

        if(this.state.NamePageFlag){
            HTMLToDisplay = (
                <div>
                    <div className="container text-center">
                        <form>
                            <div class="form-group">
                                <div class="row justify-content-center">
                                {/* row offset-xs-0 offset-sm-2 offset-md-2 */}
                                    <div class="col-xs-12 mr-3">
                                        <label htmlFor="first_name">First name</label> <br />
                                        <input type = "text" required name="first_name" placeholder="Enter your first name" className="uberEats-input" onChange={this.FirstNameChangeHandler}/> 
                                    </div>
                                    <div class="col-xs-12 ml-3">
                                        <label htmlFor="last_name">Last name</label> <br />
                                        <input type = "text" required name="last_name" placeholder="Enter your last name" className="uberEats-input" onChange={this.SecondNameChangeHandler}/>    
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                            <button onClick={this.nameSubmitted} className="login-button btn btn-primary" type="submit">Next</button>
                        </div>
                        </div>
                </div>
            );
        }

        if(this.state.PasswordPageFlag){
            HTMLToDisplay = (
                <div className="container">
                    <div className="form-group">
                        <form>
                            <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                            <p>Enter your password</p>
                                {/* <input type="text" onChange={this.emailChangeHandler} className="form-control" id="firstName" placeholder="optional" name="lastName" required /> */}
                                <input type="password" required name="password" className="form-control uberEats-input" onChange={this.PasswordNameChangeHandler} />
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-4 col-lg-6 col-md-8 offset-md-2 offset-sm-4 offset-lg-3">
                        <button onClick={this.nameSubmitted} className="login-button btn btn-primary" type="submit">Submit</button>
                    </div>
                </div>
            );
        }
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
