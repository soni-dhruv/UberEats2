import React, { Component } from 'react';
import Navbar from '../Navbar';
import Card from 'react-bootstrap/Card';
import xy from '../../images/menudish'

class CustomerRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restoData: this.props.location.state
        };  
    }

    addToCartHandler = (e) => {

        

        console.log('Inside add to cart handler.', e.target.getAttribute('id'));
        

    }

    render() {
        let x = Object.values(this.state.restoData).map((res) => {
            return (
                Object.values(res.category_items).map((item)=>{
                    return(
                        (<Card className="m-5 col-lg-3">
                        <Card.Img src={xy.link} height="55%" width="55%" />
                        <Card.Body><center>
                            <Card.Title>{item.item_name}</Card.Title>
                            <Card.Text>
                                Price: ${item.price}<br />
                                Dish Type: {item.dish_type} <br />
                                Description: {item.description}<br />

                            </Card.Text>
                            <button id={JSON.stringify(item)} className="btn btn-outline-primary" onClick={this.addToCartHandler}>Add to cart</button></center>
                            {/* <Link to={{ pathname: "/customer/restaurant", state: JSON.stringify(restaurant) }}>Menu</Link> */}
                        </Card.Body>
                    </Card>)
                    );
                })
            )
        });
        return (
            <div className="container-fluid padding">
					<div className="row padding" style={{ zIndex: 30 }}>
						{x}
					</div>
				</div>
        )
    }
}

export default CustomerRestaurant;