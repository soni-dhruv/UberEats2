import React, { Component } from "react";
import './placeOrder.css';
import axios from "axios";
import { Redirect } from "react-router";
import Modal from './Modal.js';
// import {store} from '../index.js';
import Cookies from "js-cookie";

class PlaceOrder extends Component {
    constructor(props) {
        super(props);

        let subtotalHere = 0;
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        if (cart) {
            cart.items.map((eachItem) => {
                subtotalHere += parseFloat(parseFloat(eachItem.price) * parseInt(eachItem.qty)).toFixed(2);
            });
        }

        this.state = {
            // latestOrderId: latestOrderId,
            // latestOrderItemId: latestOrderItemId,
            localCart: localStorage.getItem('UBER_EATS_CART'),
            isCartUpdated: false,
            redirectToHome: false,
            receiptData: null,
            inst : "",
            priceDistribution: {
                subtotal: subtotalHere,
                deliveryFee: 2.49,
                serviceFee: 5.00,
                caDriverBenefits: 2.00, 
                taxes: this.getTaxes(subtotalHere) // 9% of subtotal
            }
        }

        this.isLocalStorageCartUpdated = this.isLocalStorageCartUpdated.bind(this);
        this.qtyIncrement = this.qtyIncrement.bind(this);
        this.qtyDecrement = this.qtyDecrement.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.instHandler = this.instHandler.bind(this);

        console.log('STATE IS: ', this.state);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        this.setState({
            redirectToHome: true
        });
    };


    getTaxes(subtotal) {
        return parseFloat(0.09 * parseInt(subtotal)).toFixed(2);  //round it to 2 decimal places
    }


    instHandler = e =>{
        this.setState({inst : e.target.value})
    }

    componentDidMount() {
        setInterval(this.isLocalStorageCartUpdated, 500);

        // axios.get('http://localhost:3001/most_recent_orderid', {params: null})
        //         .then((response) => {

        //             //let res = JSON.parse(response.data);
        //             let res = response.data;
        //             console.log('most_recent_orderid API Response data: ', res, ' | Latest order id is: ', res.order_id)
                    
        //             this.setState({
        //                 latestOrderId: res.order_id,
        //                 latestOrderItemId: res.item_id
        //             });
                    
        //             console.log('Updated order and orderItemId in state.');

        //     }).catch(function(e) {
        //         console.error(e.message); 
        // });
    }

    isLocalStorageCartUpdated = () => {
        let currentCart = localStorage.getItem('UBER_EATS_CART');
        // console.log('Current cart: ', currentCart, ' | OLD CART: ', this.state.localCart);
        if (currentCart !== this.state.localCart) {
            // console.log("CUSTOMER_ORDERS | Cart update found | Current cart: ", currentCart, ' | OLD CART: ', this.state.localCart);
            this.setState({
                localCart: currentCart
            });
        }
    }

    qtyIncrement = (e) => {

        console.log('INCR: STATE IS @@@@: ', this.state);

        let itemClicked = JSON.parse(e.target.getAttribute('id'));
        console.log('Received qtyIncrement action for item: ', itemClicked);

        let oldQty = itemClicked.qty;
        let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));
        let newCartMenuItems = []

        let subtotalPrice = 0;
        cart.items.map((eachItem) => {
            
            let updatedItem = {
                ...eachItem
            }
            if (eachItem._id == itemClicked._id) {
                updatedItem.qty = oldQty + 1
            }

            subtotalPrice += updatedItem.price * updatedItem.qty;
            let taxes = this.getTaxes(subtotalPrice);
            this.setState({
                priceDistribution: {
                    ...this.state.priceDistribution,
                    subtotal: subtotalPrice,
                    taxes: taxes
                }
            });

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
        
        let subtotalPrice = 0;
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

            subtotalPrice += parseFloat(updatedItem.price * updatedItem.qty).toFixed(2);
            console.log('$$$$$ Updated price: ', subtotalPrice);
            let taxes = this.getTaxes(subtotalPrice);
            this.setState({
                priceDistribution: {
                    ...this.state.priceDistribution,
                    subtotal: subtotalPrice,
                    taxes: taxes
                }
            });

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

    placeOrderHandler = (e) => {

        // let reduxStoreState = store.getState();
        // let userId = reduxStoreState.userdata.user_id;

        let cart = JSON.parse(this.state.localCart);
        // let cart = this.state.localCart;
        console.log('local cart in state is: ', cart);
        
        let orderItemsArray = []
        // let oldItemId = parseInt(this.state.latestOrderItemId);
        cart.items.map((eachItem) => {

            let orderItemObj = {
                // item_id: oldItemId + 1,
                // order_id: parseInt(this.state.latestOrderId) + 1,
                // item_id: eachItem._id,
                item_name: eachItem.item_name,
                // description: eachItem.description,
                // dish_type: eachItem.dish_type,
                //restaurant_id: cart.restaurant_id,
                item_qty: eachItem.qty,
                item_price: parseFloat(parseInt(eachItem.qty) * eachItem.price).toFixed(2)
            }

            // oldItemId = orderItemObj.item_id;

            orderItemsArray.push(orderItemObj);

            return '';
        })

        let orderObject = {
            // user_id: userId,
            // order_id : parseInt(this.state.latestOrderId) + 1,
            u_email: Cookies.get('UE_user_email'),
            r_name: cart.restaurant_name,
            r_email: cart.restaurant_email,
            restaurant_id: cart.restaurant_id,
            bill: parseFloat(parseFloat(this.state.priceDistribution.subtotal) + parseFloat(this.state.priceDistribution.deliveryFee) + parseFloat(this.state.priceDistribution.serviceFee) + parseFloat(this.state.priceDistribution.caDriverBenefits) + parseFloat(this.state.priceDistribution.taxes)).toFixed(2),
            order_status: 'order_received',
            inst : this.state.inst,
            item: orderItemsArray,

            //restaurant_name: cart.restaurant_name,
            
            // delivery_fee: this.state.priceDistribution.deliveryFee,
            // service_fee: this.state.priceDistribution.serviceFee,
            // ca_driver_benefits: this.state.priceDistribution.caDriverBenefits,
            // taxes: this.state.priceDistribution.taxes,
            
            
            
            
        }

        console.log('Sending order_data to placeOrder api | Data: ', orderObject);

        axios.post('http://localhost:3001/user/placeOrder', {order_data: orderObject})
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log('Successfully saved order to database for order object: ', orderObject);

                    console.log('placeOrder API Response: ', response);

                    let orderId = response.data._id;

                    console.log('CREATED A NEW ORDER ID: ', orderId);

                    let receiptData = {
                        order_id: orderId,
                        restaurant_name: cart.restaurant_name,
                        total: (parseFloat(this.state.priceDistribution.subtotal) + parseFloat(this.state.priceDistribution.deliveryFee) + parseFloat(this.state.priceDistribution.serviceFee) + parseFloat(this.state.priceDistribution.caDriverBenefits) + parseFloat(this.state.priceDistribution.taxes)).toFixed(2),
                        totalTaxes: this.state.priceDistribution.taxes,
                        orderItemsArray: orderItemsArray
                    }
                    console.log('Order receipt data: ', receiptData);

                    this.setState({
                        receiptData: receiptData
                    });


                    this.showModal();


                    localStorage.removeItem('UBER_EATS_CART');


                    alert('Order '+response.data._id+' succesfully placed!');

                    // alert('Order successfully saved to database.');

                    this.setState({
                        redirectToHome: true
                    });

                } else if (response.status === 201) {
                    console.log('Something went wrong while storing order data in database');
                }
            })
            .catch(function(e) {
                console.error(e.message); // 
            });


    }

    render() {

        let receiptModal = null;
        if (this.state.receiptData != null && this.state.receiptData != '' && this.state.receiptData != undefined) {
            receiptModal = <Modal show={this.state.show} handleClose={this.hideModal}>
            <div className="container">
                <h3>Thank you for placing order!</h3>
                <br />
                
                <div>
                    <h4> Order Id: {this.state.receiptData.order_id}</h4>
                    <h5>Restaurant: {this.state.receiptData.restaurant_name}</h5>

                    <h4>PRICE Distribution</h4>
                    <p>Total Price: ${this.state.receiptData.total} Inclusive of total taxes worth: ${this.state.receiptData.totalTaxes}</p>

                    <h4>Order Items:</h4>
                    {this.state.receiptData.orderItemsArray.map((eachItem) => {
                        return (<p>{eachItem.item_name} <span className="temp">Qty: {eachItem.quantity}</span> <span className="temp">Price: ${parseFloat(eachItem.subtotal_price).toFixed(2)}</span></p>);
                    })}

                </div>
            </div>
        </Modal>;
        }

        let redirectVar1 = null;
        if (this.state.redirectToHome) {
            redirectVar1 = <Redirect to="/userhome" />
        }

        console.log('ORDERS | Inside render method');

        let itemList = null;
        if (localStorage.getItem('UBER_EATS_CART')) {
            let cart = JSON.parse(localStorage.getItem('UBER_EATS_CART'));

            itemList = cart.items.map((eachItem) => {
                return (//<button id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button>
                    <div key={JSON.stringify(eachItem)}>
                        {/* <p key={eachItem.item_name}>{eachItem.qty} <span>{eachItem.item_name}</span> </p> */}
                        
                        <div className="eachItemRow" key={eachItem.item_name}><button className="incrDecr" id={JSON.stringify(eachItem)} onClick={this.qtyDecrement}> - </button> {eachItem.qty} <button className="incrDecr" id={JSON.stringify(eachItem)} onClick={this.qtyIncrement}> + </button> <span className="item-name">{eachItem.item_name}</span> <span className="itemPrice">${parseFloat(eachItem.price * eachItem.qty).toFixed(2)}</span> </div>
                    </div>
                );
            });

            console.log(itemList);
        }

        let completeTotal = (parseFloat(this.state.priceDistribution.subtotal) + parseFloat(this.state.priceDistribution.deliveryFee) + parseFloat(this.state.priceDistribution.serviceFee) + parseFloat(this.state.priceDistribution.caDriverBenefits) + parseFloat(this.state.priceDistribution.taxes)).toFixed(2);

        return (
            <div>
                {redirectVar1}
                <div className="container">
                    {receiptModal}
                    <div className="row">
                        <div className="col-md-6 itemListSection">
                            <h3>Payment</h3>
                            <div className="item-list-box">
                                <p><i class='far fa-credit-card' style={{fontSize: '1.4em', marginRight: '10px'}}></i> Uber Cash: $0.00 <span style={{float: "right"}}><button className="editBtn">Edit</button></span> </p>
                            </div>
                            <div className="item-list-box">
                                <p><i class='fas fa-comment-dollar' style={{fontSize: '1.4em', marginRight: '10px'}}></i> Add promo code <span style={{float: "right"}}><button className="editBtn">Edit</button></span></p>
                            </div>
                            <div id="main-items-box">
                                <p style={{fontSize: "1.5em"}}>Your items <span style={{float: "right"}}><button id="addItemBtn"> + Add items</button></span></p>
                                <div id="main-items-box-1">
                                    {itemList}
                                </div>
                            </div>


                            <div id="main-items-box">
                                <p style={{fontSize: "1.5em"}}>Special Instructions</p>
                                <textarea rows="3" name="inst" onChange={this.instHandler} id="inst" style={{width: "100%"}}></textarea>
                            </div>


                        </div>
                        <div className="col-md-6 placeOrderSection">
                            <div id="placeorder-box-1">
                                <button id="place-order" onClick={this.placeOrderHandler}>Place order</button>
                                <p id="warning-instruction-1">
                                    If you're not around when the delivery person arrives, they'll leave your order at the door. By placing your order, you agree to take full responsibility for it once it's delivered.
                                </p>
                            </div>
                            <div id="placeorder-box-2">
                                <div id="placeorder-box-2-each-row">
                                    <p id="placeorder-box-2-each-row-label">Subtotal <span id="priceValue">${parseFloat(this.state.priceDistribution.subtotal).toFixed(2)}</span></p>
                                    <p id="placeorder-box-2-each-row-label">Delivery Fee <i style={{fontSize:"12px", color: "grey", marginLeft: "10px"}} class="fa">&#xf05a;</i> <span id="priceValue">${this.state.priceDistribution.deliveryFee}</span></p>
                                    <p id="placeorder-box-2-each-row-label">Service Fee <i style={{fontSize:"12px", color: "grey", marginLeft: "10px"}} class="fa">&#xf05a;</i> <span id="priceValue">${this.state.priceDistribution.serviceFee}</span></p>
                                    <p id="placeorder-box-2-each-row-label">CA Driver Benefits <i style={{fontSize:"12px", color: "grey", marginLeft: "10px"}} class="fa">&#xf05a;</i> <span id="priceValue">${this.state.priceDistribution.caDriverBenefits}</span></p>
                                    <p id="placeorder-box-2-each-row-label">Taxes <span id="priceValue">${this.state.priceDistribution.taxes}</span></p>
                                </div>
                            </div>
                            <div id="placeorder-box-3">
                                <p><b>Add a tip</b> <i style={{fontSize:"12px", color: "grey", marginLeft: "10px"}} class="fa">&#xf05a;</i> <span id="priceValue"><b>${completeTotal}</b></span> </p>
                                <p id="warning-instruction-2">
                                    Delivery people are critical to our communities at this time. Add a tip to say thanks.
                                </p>
                                <div id="tip-main-box">
                                    
                                    {/* <span className="tip-box">15%</span> <span className="tip-box">18%</span> <span className="tip-box">20%</span> <span className="tip-box">25%</span> <span className="tip-box">Other</span> */}
                                    
                                    <button className="tip-box">15%</button> <button className="tip-box">18%</button> <button className="tip-box">20%</button> <button className="tip-box">25%</button> <button className="tip-box">Other</button>

                                </div>
                            </div>
                            <div id="placeorder-box-4">
                                <p><b>Total</b> <span id="totalPriceValue"><b>${completeTotal}</b></span></p>
                            </div>

                            {/* <hr style={{backgroundColor: "blue", borderTop: "green"}} className="orderSectionDivider" /> */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaceOrder;