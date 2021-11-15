import React, { Component } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { constats } from '../../ip/config';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
class resName {
	constructor() {
		this.name = 'Subway';
		this.addr = '43 S 1st St.';
		this.avg_cost = 2.49;
		this.delivery_time = '15-25';
		this.img_url = 'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg';
		this.rating = 4.5;
	}
}

let arr = [];
for (let i = 0; i < 2; i++) {
	arr.push(new resName());
}

arr.push({
	name: 'Shree Krishna',
	addr: '43 S 1st St.',
	avg_cost: 2.49,
	delivery_time: '15-25',
	img_url: 'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg',
	rating: 4.5
});

export class userhome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			data: arr, //""
			filteredData: "",
			restaurantSuggestions: {},
			redirectRestoDetails: {}
		};

		console.log('Inside customer home component');
		this.handleInputChange = this.handleInputChange.bind(this);
		this.restoClickHandler = this.restoClickHandler.bind(this);
	}

	handleInputChange = (event) => {
		const query = event.target.value;
		console.log(event.target.value + " is the event.target.value");

		this.setState((prevState) => {
			const filteredData = prevState.data.filter((element) => {
				return element.name
					.toLowerCase()
					.includes(query.toString().toLowerCase());
			});
			console.log("the filtered data is: ")
			console.log(filteredData)
			return {
				query,
				filteredData,
			};
		});
	};

	restoClickHandler = (e) => {
		console.log('Inside resto click handler');
		let itemClickedData = e.target.getAttribute('id');
		console.log('Item clicked data: ', itemClickedData);
		this.setState({ redirectRestoDetails: itemClickedData });
	}

	componentDidMount() {

		console.log('Inside userhome did mount');
		axios.get(`http://${constats.AWS.ipAddress}:3001/user/profile`, { params: { email: Cookies.get('UE_user_email') } })
			.then((response) => {

				if (response.status === 200) {

					console.log('Profile details API Response data for customer home page: ', response.data[0])

					this.setState({
						profileDetails: response.data[0]
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

	render() {
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
							<Link to={{ pathname: "/customer/restaurant", state: JSON.stringify(restaurant) }}>Menu</Link>
						</Card.Body>
					</Card>
				);
			});
		}

		return (
			<div>
				{/* <Navbar /> */}
				<div className="container">
					<div className="row">
						<div className="col-sm-6 mx-auto">
							<form>
								<input
									style={{ width: "100%", height: "42px" }}
									placeholder="Search here"
									value={this.state.query}
									onChange={this.handleInputChange}
								/>
							</form>
						</div>
					</div>
				</div>
				<div className="container-fluid padding">
					<div className="row padding" style={{ zIndex: 30 }}>
						{restoSuggestionsDiv}
					</div>
				</div>
			</div>
		)
	}
}

export default userhome;