import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Ask_email extends Component {

    constructor(props){
        super(props);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.set_Email_state = this.set_Email_state.bind(this);
        console.log(props.state);
        this.state = props.state;
    }

    emailChangeHandler = (e)=> {
        this.setState({
            email: e.target.value
        });
    };

    set_Email_state = (e) => {
        console.log(this.state.email);
    };

    render() {
        // console.log("hello should be here");
        // console.log("email is " + this.state.email);
        return (
            <div>
                <form>
                    <div className="form-group">
                    
                        <label className="control-label col-sm-2" htmlFor="email">Enter email:</label>
                            <div className="col-sm-4">
                                {/* <input type="text" onChange={this.emailChangeHandler} className="form-control" id="firstName" placeholder="optional" name="lastName" required /> */}
                                <input type="text" required name="emailid" placeholder="Enter your email" className="" onChange={this.emailChangeHandler}/>
                            </div>
                    </div>
                </form>
                <button type="submit" onClick={Redirect="/signup/name"}>
                    submit_text
                </button>
                
            </div>
            
        )
    }
}

export default Ask_email;