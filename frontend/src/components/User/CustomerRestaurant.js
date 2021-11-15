import React, { Component } from 'react';
import Navbar from '../Navbar';
import Card from 'react-bootstrap/Card';
import xy from '../../images/menudish'

class CustomerRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restoMenuData: this.props.location.state.menu,
            restoData: this.props.location.state.restaurant_data
        };  

        this.addToCartHandler = this.addToCartHandler.bind(this);

        console.log('Restaurant menu data from the userhome page is: ', this.props.location.state.menu);
        console.log('Restaurant data from the userhome page is: ', this.props.location.state.restaurant_data);   
    }

    addToCartHandler = (e) => {
        console.log('Inside add to cart handler.', e.target.getAttribute('id'));
        
        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        console.log('ItemClicked data: ', itemClicked);

        if (localStorage.getItem('UBER_EATS_CART')) {
            let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));

            if (cart.restaurant_id == this.state.restoData.restaurant_id) {

                let a = cart.items;
                let itemExists = false;

                a.map(eachItem => {
                    console.log('#### Item in this iteration: ', eachItem);

                    if (eachItem._id === itemClicked._id) {
                        itemExists = true;
                    }

                    return eachItem;
                })

                if (itemExists) {
                    console.log("!!!!!!!!!!!!!! Item with id ", itemClicked.item_id, ' already exists. Not adding this item in cart');
                } else {
                    itemClicked = {
                        ...itemClicked, qty: 1
                    }

                    a.push(itemClicked);

                    let refreshedCart = {
                        restaurant_id: this.state.restoData.restaurant_id,
                        restaurant_email: this.state.restoData.restaurant_email,
                        restaurant_name: this.state.restoData.restaurant_name,
                        items: a
                    }

                    localStorage.setItem('UBER_EATS_CART', JSON.stringify(refreshedCart));

                    console.log('Item with item_id: ', itemClicked.item_id, ' sucessfully added in cart');
                }
            } else {
                console.log('Cart already contains items from restaurant with id: ', cart.restaurant_id);
            }
        } else {
            itemClicked = {
                ...itemClicked, qty: 1
            }

            let newCart = {
                restaurant_id: this.state.restoData.restaurant_id,
                restaurant_email: this.state.restoData.restaurant_email,
                restaurant_name: this.state.restoData.restaurant_name,
                items: [itemClicked]
            }

            console.log('New Cart is: ', newCart);
            localStorage.setItem('UBER_EATS_CART', JSON.stringify(newCart));
        }

        console.log('Updated cart is: ', localStorage.getItem('UBER_EATS_CART'));

        // let cart = {
        //     restaurant_id: this.state.restoData.restaurant_id,
        //     restaurant_email: this.state.restoData.restaurant_email,
        //     restaurant_name: this.state.restoData.restaurant_name,
        //     items: this.state.restoMenuData
        // }

        // console.log('cart after addtocart handler is: ', cart);
        // console.log('cart after addtocart handler is: ', JSON.stringify(cart));

        // localStorage.setItem('UBER_EATS_CART111', cart);
    }

    render() {
        let x = Object.values(this.state.restoMenuData).map((res) => {
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