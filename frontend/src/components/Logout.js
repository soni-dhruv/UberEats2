import React, { Component } from 'react';
import Cookies from "js-cookie";
import { Redirect, Route } from 'react-router-dom';



//Define a Login Component
class Logout extends Component {
    //call the constructor method - it will simply initalize the state
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //message to be shown for the corresponding statusCode
        this.state = { redirectNow: false }
    }
    //Bind the handlers to this class



    //email change handler to update state variable with the text entered by the user

    //submit Login handler to send a request to the node backend
    componentDidMount() {
        Cookies.remove('UE_user_email');
        Cookies.remove('UE_usertype');
        this.setState({ redirectNow: true })
    }


    //set the with credentials to true


    render() {

        var redirect = null;
        if (this.state.redirectNow === true) {
            console.log("this should redirect now");
            // const html_redirect=(<div><Router><Redirect to= "/"/></Router></div>)
            redirect = <Redirect to="/login" />
        }

        return (
            <>
                {redirect}
            </>
        )
    }
}
export default Logout;
//export default connect(null, mapDispatchToProps)(Login); //redux