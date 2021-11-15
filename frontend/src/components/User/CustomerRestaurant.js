import React, { Component } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { constats } from '../../ip/config';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

class CustomerRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restoData: this.props.location.state
        };
        console.log('Inside constructor. Restaurant data from redirect is: ', this.props.location.state);
    }

    render() {
        let restoSuggestionsDiv = null;
        if (JSON.stringify(this.state.restoData) !== JSON.stringify({})) {
            restoSuggestionsDiv = this.state.restoSuggestionsDiv.map(restoData => {
                return (
                    <Card className="m-5 col-md-3">
                        <Card.Img src={'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg'} height="55%" width="55%" />
                        <Card.Body>
                            <Card.Title>{restoData.name}</Card.Title>
                            <Card.Text>
                                {restoData.city}
                                {/* {restoData.menu.category.item_name}
                                {restoData.menu.category.dish_type}
                                {restoData.menu.category.price} */}
                            </Card.Text>
                            {/* <Button id={JSON.stringify(restaurant)} variant="primary" onClick={this.restoClickHandler}>Menu</Button> */}
                            <Link to={{ pathname: "/customer/restaurant", state: JSON.stringify(restoData) }}>Add to cart</Link>
                            {/* <Button variant="primary">Favourite</Button> */}
                        </Card.Body>
                    </Card>
                );
            });
        }
        return (
            <div>
                <div>
                    <div className="container-fluid padding">
                        <div className="row padding" style={{ zIndex: 30 }}>
                            {restoSuggestionsDiv}
                        </div>
                    </div>
                </div>
                {this.state.restoData}
            </div>
        )
    }
}

export default CustomerRestaurant;