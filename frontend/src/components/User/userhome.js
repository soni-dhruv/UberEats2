import React, { Component } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { constats } from '../../ip/config';
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
  name : 'Shree Krishna',
  addr : '43 S 1st St.',
  avg_cost : 2.49,
  delivery_time : '15-25',
  img_url : 'https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg',
  rating : 4.5
});

export class userhome extends Component {
  constructor(props){
    super(props);
    this.state={
      query:"",
      data:arr, //""
      filteredData:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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

  // getData=()=>{//make the axios call}
  componentDidMount(){
    // this.getData();
  }
  render() {

    let searchCode;
    if (this.state.query.length !== 0)
    {
      searchCode = (
        this.state.filteredData.map((item, num) => {
          return (
            <Card className="m-5 col-md-3">
              <Card.Img src={item.img_url} height="55%" width="55%" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.addr}
                </Card.Text>
                <Button variant="primary">Menu</Button>
                <Button variant="primary">Favourite</Button>
              </Card.Body>
            </Card>
          )
        })
      );
    } else{
      searchCode=this.state.data.map((item, num) => {
        return (
          <Card className="m-5 col-md-3">
            <Card.Img src={item.img_url} height="55%" width="55%" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.addr}
              </Card.Text>
              <Button variant="primary">Menu</Button>
              <Button variant="primary">Favourite</Button>
            </Card.Body>
          </Card>
        )
      })
    }
    
    return (
      <div>
        <Navbar />
        <div className="container">
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <form>
              <input
                style={{ width: "100%", height: "42px" }}
                placeholder="Enter dish name"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
        <div className="container-fluid padding">
          {/* in the div of container fluid */}
          <div className="row padding" style={{ zIndex: 30 }}>
            {searchCode}
          </div>
        </div>
      </div>
    )
  }
}

export default userhome
