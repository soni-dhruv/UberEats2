import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import cookie from 'react-cookies';
import axios from 'axios';
import {Card,Button, Row, Col, Link, CardGroup, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
//import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';

export class restrorders extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableRows: null,
            orders: null,
            deliveryStatus: 0,
            orderID: 0,
            redirect: false
        }

        //this.getDeliveryStatus = this.getDeliveryStatus.bind(this);
        //this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount (){
        console.log("im in")
        const data = {
            email: "jackinthebox.sanjose@jackinthebox.com"
        }
        axios.post('restaurant/order', data).then(response => {
            //console.log(response.data);
            let orders = [], i = 0, orderDetails = [], singleItem = [], currentOrderID = 0;
            //console.log(deliveryStatus[response.data[0].DELIVERY_STATUS - 1]);
            let j = 0, tableRows = null;
            // <table><tr><th>Order ID</th> &nbsp; &nbsp; &nbsp; &nbsp;<th>Order Status</th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <th>Order Details</th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <th>Order Type</th></tr>
            response.data.map(order => {
                //singleItem = [order.DISH_NAME, order.QUANTITY];
                orders[j][0] = order._id;
                orders[j][1] = order.order_status;
                orders[j][3] = order.order_type
                //get order items like dish name x quantity, dish name x quantity..
            });

            console.log(orders);

            tableRows = orders.map(order =>  {
                let itemsDisplay = "", itemsDisplay1 = "";
                order[1].map(items => {itemsDisplay +=  items[0] + ' x ' + items[1] + ", "});
                itemsDisplay1 = itemsDisplay.slice(0, -2);
                //console.log(itemsDisplay1);
                return <tr><td>{order[0]}</td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <td><input name="status" type="text" defaultValue={order[2]} onChange={(e) => this.getDeliveryStatus(order[0], e)} required/></td> &nbsp; &nbsp; &nbsp; <td>{itemsDisplay1}</td> &nbsp; &nbsp; &nbsp; <td>{order[3]}</td> &nbsp; &nbsp; &nbsp; <td>{order[4]}</td></tr>;
            });

            if(orders !== null){
                this.setState({
                    orders: orders,
                    tableRows: tableRows
                })
            }

            

        }, error => {
            console.log("Something went wrong: " + error);
        });
    }


    // updateTable = (e) => {
    //     e.preventDefault();
    //     console.log("you're trying to save the changes");

    //     const data = {
    //         deliveryStatus: this.state.deliveryStatus,
    //         orderID: this.state.orderID
    //     }

    //     console.log("data getting sent is: " + data);
    //     axios.defaults.withCredentials = true;
    //     axios.post(`${backendServer}/orders/updateorders`, data).then(response => {
    //         //console.log(response.data);

    //         if(response.data === "successfully updated"){
    //             this.setState({
    //                 redirect : true
    //             });
    //         }

    //     }, error => {
    //         console.log("Something went wrong: " + error + error.status);
    //     }
    //     );

    // }

    render(){
        console.log(this.state.redirect);
        let redirect = null;
        

        return(
            <>
                {redirect}
                <center><h3>Your Orders</h3>
                
                <form onSubmit={this.updateTable}>
                <table><tr><th>Order ID</th> &nbsp; &nbsp; &nbsp; &nbsp;<th>Order Status</th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <th>Order Details</th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <th>Order Type</th></tr>
                    {this.state.tableRows} </table><br/> <br/>
                <input type="submit" class="btn-primary" value="Save Changes"/>
                </form>
                </center>
            </>
        );

    }

}

export default restrorders
