import React, { Component } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { constats } from '../../ip/config';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import Modal from '../../components/modal';
import './userhome.css';
import { Redirect } from 'react-router-dom';

// class resName {
// 	constructor() {
// 		this.name = 'Subway';
// 		this.addr = '43 S 1st St.';
// 		this.avg_cost = 2.49;
// 		this.delivery_time = '15-25';
// 		this.img_url = 'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg';
// 		this.rating = 4.5;
// 	}
// }

// let arr = [];
// for (let i = 0; i < 2; i++) {
// 	arr.push(new resName());
// }

// arr.push({
// 	name: 'Shree Krishna',
// 	addr: '43 S 1st St.',
// 	avg_cost: 2.49,
// 	delivery_time: '15-25',
// 	img_url: 'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg',
// 	rating: 4.5
// });

export class userhome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			data: "", //""
			filteredData: "",
			restaurantSuggestions: {},
			redirectRestoDetails: {},
			show: false,
			showcart: true,
			checkoutBtnClicked: false
		};

		console.log('Inside customer home component');
		this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
		this.hideCart = this.hideCart.bind(this);
		this.showCart = this.showCart.bind(this);
		this.qtyIncrement = this.qtyIncrement.bind(this);
        this.qtyDecrement = this.qtyDecrement.bind(this);
		// this.hideModal = this.hideModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.restoClickHandler = this.restoClickHandler.bind(this);
	}

	showCart = () => {
		this.setState({
			showcart: true
		});
	}

	hideCart = () => {
		this.setState({
			showcart: false
		});
	}
	
	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	proceedToCheckout = () => {
        // console.log('Proceed to checkout button clicked');
        this.setState({
            checkoutBtnClicked: true
        });
        // this.hideModal();
    }

	handleInputChange = (event) => {

		this.setState({
			query: event.target.value
		})
		// this.setState(() => {
		// 	const filteredData = this.state.restaurantSuggestions.filter((element) => {
		// 		return element.name
		// 			.toLowerCase()
		// 			.includes(query.toString().toLowerCase());
		// 	});
		// 	console.log("the filtered data is: ")
		// 	console.log(filteredData)
		// 	return {
		// 		query,
		// 		filteredData,
		// 	};
		// });
	};

	qtyIncrement = (e) => {
        
        // store.subscribe(() => console.log('######### NAVBAR | REDUX STORE STATE: ', store.getState()));

        // console.log("Hello qtyIncrement");
        // console.log('@@@@@@@@@@@@########## REDUX : ', store.getState());
        // console.log("Hello qtyIncrement1111");

        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        console.log('Received qtyIncrement action for item: ', itemClicked);
        // console.log("Hello qtyIncrement1111");

        let oldQty = itemClicked.qty;
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        let newCartMenuItems = []

        cart.items.map((eachItem) => {
            
            let updatedItem = {
                ...eachItem
            }
            if (eachItem._id == itemClicked._id) {
                updatedItem.qty = oldQty + 1
            }

            newCartMenuItems.push(updatedItem);

            console.log("%%%%%%%%% UPDATED ITEM: ", updatedItem);
            
            return eachItem;
        });

        let newCart = {...cart, items: newCartMenuItems};
        localStorage.setItem('UBER_EATS_CART', JSON.stringify(newCart));
        console.log('NEW CART set in localStorage is: ', JSON.stringify(newCart));

        this.setState({isCartUpdated: true});
    }

    qtyDecrement = (e) => {

        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        console.log('Received qtyDecrement action for item: ', itemClicked);

        let oldQty = itemClicked.qty;
        let newQty = oldQty - 1;

        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        let newCartMenuItems = []
        
        cart.items.map((eachItem) => {
            
            let updatedItem = {
                ...eachItem
            }
            if (eachItem._id == itemClicked._id) {
                updatedItem.qty = newQty
            }

            if (updatedItem.qty !== 0) {
                newCartMenuItems.push(updatedItem);
            }

            console.log("%%%%%%%%% UPDATED ITEM: ", updatedItem);
            
            return eachItem;
        });

        if (newCartMenuItems.length === 0) {
            localStorage.removeItem('UBER_EATS_CART');
            console.log('CART IS NOW EMPTY');
        } else {
            let newCart = {...cart, items: newCartMenuItems};
            localStorage.setItem('UBER_EATS_CART', JSON.stringify(newCart));
            console.log('NEW CART set in localStorage is: ', JSON.stringify(newCart));
        }
        
        this.setState({isCartUpdated: true});
    }

	restoClickHandler = (e) => {
		console.log('Inside resto click handler');
		let itemClickedData = e.target.getAttribute('id');
		console.log('Item clicked data: ', itemClickedData);
		this.setState({ redirectRestoDetails: itemClickedData });
	}

	componentDidMount() {

		console.log('Inside userhome did mount');
		console.log('Email in cookie: ', Cookies.get('UE_user_email'));
		axios.get(`http://${constats.AWS.ipAddress}:3001/user/profile`, { params: { email: Cookies.get('UE_user_email') } })
			.then((response) => {

				if (response.status === 200) {

					console.log('Profile details API Response data for customer home page: ', response.data)

					this.setState({
						profileDetails: response.data
					});

					if (JSON.stringify(this.state.profileDetails) !== JSON.stringify({})) {

						axios.get(`http://${constats.AWS.ipAddress}:3001/user/restaurant_suggestions`, { params: { city: this.state.profileDetails.city } })
							.then((response) => {

								console.log('Restaurant suggestions API Response data: ', response.data)

								this.setState({
									restaurantSuggestions: response.data
								});
							}).catch(function (e) {
								console.error(e.message);
							});
					} else {
						//console.log("BS>>>>>>"); //ERROR...
					}

				} else if (response.status === 201) {
					// no profile details... SHOULD NEVER OCCUR.
				}

			}).catch(function (e) {
				console.error(e.message);
			});
	}

	search = e => {
		e.preventDefault();
		let data = {
			general_search_string: this.state.query
		}

		console.log("going for order update", data);
		axios.post(`http://${constats.AWS.ipAddress}:3001/user/search`, data)
			.then(response => {
				console.log(response.data);
				this.setState({
					restaurantSuggestions: response.data
				});
				// console.log("!@!@!@!@!@!", this.state.order_list.length);
			})
			.catch(err => {

			});
	}

	render() {
		console.log("the state restuarantdata is");
		console.log(this.state.restaurantSuggestions[0]);
		console.log('Inside render method | State is: ', this.state);
		let restoSuggestionsDiv = null;
		if (JSON.stringify(this.state.restaurantSuggestions) !== JSON.stringify({})) {
			restoSuggestionsDiv = this.state.restaurantSuggestions.map(restaurant => {
				return (
					<Card className="m-5 col-md-3">
						<Card.Img src={'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg'} height="55%" width="55%" />
						<Card.Body>
							<Card.Title>{restaurant.name}</Card.Title>
							<Card.Text>
								{restaurant.city}

							</Card.Text>
							{console.log("restaurant is in the card is:")}
							{console.log(restaurant.menu)}
							{/* <Link to={{ pathname: "/customer/restaurant", state: {restaurant} }}>Menu</Link> */}
							{/* <Link to="/customer/restaurant" state= {{restaurantt: restaurant}}>Menu</Link> */}
							<Link to={{
								pathname: '/customer/restaurant', state: {
									menu: restaurant.menu,
									restaurant_data: {
										restaurant_id: restaurant._id,
										restaurant_email: restaurant.email,
										restaurant_name: restaurant.name
									}
								}
							}}>Menu</Link>
						</Card.Body>
					</Card>
				);
			});
		}

		let cartDiv = null;
		let itemList = null;
		if (localStorage.getItem('UBER_EATS_CART')) {

			console.log('Inside localstorage check 1111');

			let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
			console.log('Cart is : ', cart);
			
			if (this.state.showcart) {
				cartDiv = (
					<div id="cart-div">
						<span id="cart-close-btn"><button onClick={this.hideCart}>X</button></span>
						{/* This is the cart! */}

						<div>
							{itemList = (cart.items).map(eachItem => {
								return (
									<div id={eachItem} key={eachItem} className="each-item container">
										<div>{eachItem.item_name} <span className="cartQty"><button id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></span></div>
									</div>
								);
							})}

							<br />
							<button style={{width: '90%', marginLeft: '50px', marginRight: '25px'}} id="checkout" onClick={this.proceedToCheckout}>Proceed to Checkout</button>
							{/* hello in modal! */}
						</div>

					</div>
				);
			}
		}

		let modal = null;
		// if (localStorage.getItem('UBER_EATS_CART') || this.state.isCartUpdated) {
		if (localStorage.getItem('UBER_EATS_CART')) {

			console.log('Inside localstorage check');

			let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
			console.log('Cart is : ', cart);

			let itemList = null;
			modal = <Modal show={true} handleClose={this.hideModal}>
						<div className="">
							<h3>Your cart!</h3>
							<br />
							
							{/* {foodDishList = (eachCategory.dishes).map(eachFoodDish => {
				<div className="container">
					<h3>Your cart!</h3>
					<br />

					{/* {foodDishList = (eachCategory.dishes).map(eachFoodDish => {
								return (
									<div className="food-dish">{eachFoodDish.item_name} <i className="fa fa-shopping-cart addToCartSymbol" id={JSON.stringify(eachFoodDish)} onClick={this.addToCartHandler} style={{fontSize: "24px", float: "right"}}></i></div>
								);
							})} */}

					<div>
						{/* {itemList = (cart.menu_items).map(eachItem => {
									return (
										<div id={eachItem} key={eachItem} className="each-item container">
											<div>{eachItem.item_name} <span className="cartQty"><button id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button></span></div>
										</div>
									);
								})} */}

						hello in modal!
					</div>

					{/* <button id="save-cart" onClick={this.saveCart}>Save cart</button>
							<button id="checkout" onClick={this.proceedToCheckout}>Proceed to Checkout</button> */}
				</div>
			</Modal>;

			console.log('Modal is: ', modal);
		}

		let redirectVar2 = null;
        if (this.state.checkoutBtnClicked) {
            redirectVar2 = <Redirect to="/checkout"/>
            console.log('Inside checkoutBtnClick check in render method. RedirectVar2 is: ', redirectVar2);
            this.setState({
                checkoutBtnClicked: false
            });
        }

		return (
			<div>
				{redirectVar2}
				<div>
					<div className="container">
						<div className="row">
						
							<div className="col-md-10">
								<input
									style={{ width: "100%", height: "42px" }}
									placeholder="Search here"
									value={this.state.query}
									onChange={this.handleInputChange}
								/>

								<button onClick={this.search}>Search</button>
							</div>
							<div className="col-md-2">
								<button onClick={this.search}>Search</button>
							</div>
						</div>
					</div>
					<div className="container-fluid padding">
						<div className="row padding" style={{ zIndex: 30 }}>
							{restoSuggestionsDiv}
						</div>
					</div>

					{cartDiv}
				</div>
			</div>
		)
	}
}

export default userhome;