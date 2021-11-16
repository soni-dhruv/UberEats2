import React, { Component } from 'react';
import axios from 'axios';
import { constats } from '../../ip/config';
import { Redirect } from 'react-router';
import './order.css';
import Cookies from "js-cookie";
import Modal from '../modal';
import Paginate from './Pagination';

export class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            usertype: localStorage.getItem("usertype"),
            order_list: [],
            items_list: [],
            filter_order: [],
            show: false,
            curr_page: 1,
            postPerPage: 5,
            order_status: '',
            status: false,

        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.postperChange = this.postperChange.bind(this);
        this.orderStatusChangeHandler = this.orderStatusChangeHandler.bind(this);
        this.orderUpdateChangeHandler = this.orderUpdateChangeHandler.bind(this);
    }

    componentDidMount() {
        const data = {
            email: Cookies.get('UE_user_email')
            // email : "jackinthebox.sanjose@jackinthebox.com"
        }
        console.log("going for order here");
        axios.defaults.headers.common['authorization'] = (localStorage.getItem('token'));
        axios.post(`http://${constats.AWS.ipAddress}:3001/user/order`, data)
            .then(response => {
                this.setState({
                    order_list: (response.data),
                    filter_order: (response.data),
                });
                console.log("!@!@!@!@!@!", response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateStatus = e =>{
        let status = e.target.getAttribute("id");
        console.log(status);
    }

    orderUpdateChangeHandler = e =>{
        this.setState({
            status: e.target.value,
           //clicked
        }) 
    }


    showModal = (e) => {
        e.preventDefault();
        console.log("!!!!!!!!!!!!!!!!!!!", (e.target.getAttribute("id")));

        this.setState({
            items_list: JSON.parse(e.target.getAttribute("id"))
        })


        this.setState({
            show: true,
        });
    }

    hideModal = () => {
        this.setState({
            show: false,
        });
    }

    postperChange = (e) => {
        this.setState({
            postPerPage: e.target.value
        })
    }


    cancelOrder = e => {
        e.preventDefault();
        let abc = e.target.getAttribute("id");
        console.log(abc);
        let data = {
             order_id : e.target.getAttribute("id"),
             order_status : "cancel"
        }
        
        console.log("going for order update",data);
        axios.post(`http://${constats.AWS.ipAddress}:3001/restaurant/order/update`, data)
            .then(response => {
                console.log(response.data);
                (this.props.history.push("/userhome"))
                this.setState({
                    status: true,
                });
                // console.log("!@!@!@!@!@!", this.state.order_list.length);
            })
            .catch(err => {

            });
    }

    orderStatusChangeHandler = (e) => {
        e.preventDefault();
        let stat = e.target.value;

        if (stat === 'all') {
            this.setState({
                filter_order: this.state.order_list
            })
        } else {
            // this.setState({
            //     filter_order: ""
            // })
            console.log("****************", stat);
            //resttype = "both";
            var filteredList = [];
            var arr = (this.state.order_list);
            console.log('array after parse', arr);
            console.log(typeof (arr));
            filteredList = arr.filter(order => order.order_status === stat);
            console.log('array after filtering', filteredList);

            this.setState({
                filter_order: (filteredList)
            });
        }
    }

 
    


    render() {

        // window.location.reload(this.state.status);
        
        let getOrder = null;
        if (this.state.order_list != null) {


            const indexOfLastPost = this.state.curr_page * this.state.postPerPage;
            const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
            const currentOrders = this.state.filter_order.slice(indexOfFirstPost, indexOfLastPost);
            let yes = true;
            let css = 'custom-btn bg-transparent';
            getOrder = currentOrders.map(order => {
                // if (localStorage.getItem('usertype') === 'cust') {

                if (order.order_status !== 'cancel') {
                    console.log(order);
                    yes = false;
                    css = 'custom-btn btn-13';
                }
                else {
                    yes = true;
                    css = 'custom-btn bg-transparent';
                }

                // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%",order._id.item);
                // if(order.order_status !==)
                return (

                    <table className="styled-table">
                        <tbody>
                            <tr>

                                <td className="text-center">{order._id}</td>
                                <td className="text-center">{order.r_name}</td>
                                <td className="text-center">${order.bill}</td>

                                <td className="text-center">{order.order_status}</td>



                                <td className="text-center">  <button disabled={yes} className={css} id={order._id} onClick={this.cancelOrder}>Cancel</button></td>
                                <td className="text-center">{order.instruction}</td>

                                <td className="text-center"><button className="btn bg-transparent" id={JSON.stringify(order.item)} onClick={this.showModal}> Details </button></td>
                            </tr>

                        </tbody>
                    </table>
                )
                // }
                // else {
                //     return (
                //         <table class="table">
                //             <tbody>
                //                 <tr>

                //                     <td className="text-center">{order._id._id}</td>
                //                     <td className="text-center">{order._id.rest_name}</td>
                //                     <td className="text-center">${order._id.total_cost}</td>

                //                     <td>  <select name="orderupdate" disabled={usertype} onChange={this.orderUpdateChangeHandler}>
                //                         <option selected value=''>select</option>
                //                         <option value="Delivered">Delivered</option>
                //                         <option value="Preparing">Preparing</option>
                //                         <option value="received">New Order</option>
                //                         <option value="Picked Up">Picked Up</option>
                //                     </select>
                //                         <button disabled={usertype} id={order} onClick={this.updateStatus}>Update</button></td>

                //                     <td className="text-center"><button className="btn bg-transparent" id={order._id.item} onClick={this.showModal}> - </button></td>
                //                 </tr>

                //             </tbody>
                //         </table>
                //     )
                // }
            })
        }

        let modal = null;
        let totalCost = 2;
        if (this.state.items_list != null) {
            modal = <Modal show={this.state.show} handleClose={this.hideModal}>

                <div className="container">
                    <h3>Details</h3>
                    <br />
                    <div>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Item Name</th>
                                    <th className="text-center">Item Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Total Price</th>
                                </tr>
                            </thead>
                        </table>

                        {this.state.items_list.map(eachItem => {
                            let eachCost = eachItem.item_qty * eachItem.item_price;
                            console.log("<<<<<<<<<<<<<>>>>>>>>>>>>",eachItem)
                            totalCost = totalCost + eachCost;
                            return (
                                <table className="styled-table" id={eachItem} key={eachItem}>
                                    <tbody>
                                        <tr>
                                            <td className="text-center"> {eachItem.item_name}</td>
                                            <td className="text-center">${eachItem.item_price}</td>
                                            <td className="text-center">{eachItem.item_qty}</td>
                                            <td className="text-center">${eachCost}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            );

                        }

                        )}

                        <table className="styled-table"  >
                            <tbody>
                                <tr>
                                    <td className="text-center">Tax</td>
                                    <td className="text-center">$2</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Total Cost</td>
                                    <td className="text-center">${totalCost}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </Modal>

        }

        const paginate = pageNumber => {
            this.setState({
                curr_page: pageNumber
            })
        };


        return (
            <div>
                <div className="heading">
                    Past Orders
                </div>
                <div>
                    <select className="select1"  name="orderstatus" required onChange={this.orderStatusChangeHandler}>
                        <option value='all'>All Orders</option>
                        <option value="new">New</option>
                        <option value="cancel">Canclled</option>
                        <option value="received">Preparing</option>
                        <option value="done">Delivered</option>
                    </select>
                </div>

                <div className="mar-bor">

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th className="text-center">Order No</th>
                                <th className="text-center">Resturant Name</th>
                                <th className="text-center">Total Cost</th>
                                <th className="text-center">Oder Status</th>
                                <th className="text-center">Cancel Order?</th>
                                <th className="text-center">Instructions</th>
                                <th className="text-center">Show Receipt</th>
                            </tr>
                        </thead>
                    </table>


                    {getOrder}
                </div>
                <Paginate postPerPage={this.state.postPerPage} totalPost={this.state.filter_order.length} paginate={paginate} />
                <select value={this.state.postPerPage} name="orderstatus" required onChange={this.postperChange}>
                    <option selected value='2'>2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                {modal}
            </div>
        )
    }
}

export default Orders
