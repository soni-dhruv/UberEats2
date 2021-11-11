import React, { Component } from 'react';
import Navbar from '../Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
// import CardGroup from 'react-bootstrap/CardGroup';
// import SearchBar from './SearchBar';


class resName{
    constructor(){
        this.name= 'Subway';
        this.addr= '43 S 1st St.';
        this.avg_cost= 2.49;
        this.delivery_time='15-25';
        this.img_url='https://littlesunnykitchen.com/wp-content/uploads/2020/11/Easy-Pancake-Recipe-2.jpg';
        this.rating=4.5;
    }
}

let arr=[];
for (let i = 0; i < 50; i++) { 
    arr.push(new resName());
  }



export class userhome extends Component {


    render() {
        console.log(arr[0]);
        let listItems = arr.map((item, num) => {
            return(
            // <div key={num}>
                // {/* <Container style={{display: 'flex', flexDirection: 'row'}}> */}
                // {/* <Col md={5}> */}
                    <Card className="m-5 col-md-3">
                    <Card.Img src="holder.js/100px180" height="55%" width="100%"/>
                    <Card.Body> 
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Check it out</Button>
                    </Card.Body>
                    </Card>
                // {/* </Col> */}
                // {/* </Container> */}
                
            // </div>
            )     
        })
        return (
            <div>

{/* <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarToggleExternalContent2" aria-controls="navbarToggleExternalContent2" aria-expanded="false" aria-label="Toggle navigation">
      <b class="fas fa-bars"></b>
    </button>
  </div>
</nav>
<div class="collapse" id="navbarToggleExternalContent2">
  <div class="bg-light shadow-3 p-4">
    <button class="btn btn-link btn-block border-bottom m-0">Link 1</button>
    <button class="btn btn-link btn-block border-bottom m-0">Link 2</button>
    <button class="btn btn-link btn-block m-0">Link 3</button>
  </div>
</div> */}
{/* <div>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-expanded="false" aria-controls="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav ml-auto"> 
				<li class="nav-item">
					<a class="nav-link" href="#">Home</a>
				</li>
			</ul> 
		</div>
        </div>
    </nav>
</div>
 */}

{/* <div class="col-9 order-1 text-left mr-auto">
              

              <span class="d-inline-block d-lg-block"><a href="#" class="text-black site-menu-toggle js-menu-toggle py-5"><span class="icon-menu h3 text-white"></span></a></span>

              

              <nav class="site-navigation text-right ml-auto d-none d-lg-none" role="navigation">
                <ul class="site-menu main-menu js-clone-nav ml-auto ">
                  <li class="active"><a href="index.html" class="nav-link">Home</a></li>
                  <li><a href="about.html" class="nav-link">About</a></li>
                  <li><a href="services.html" class="nav-link">Services</a></li>
                  <li><a href="blog.html" class="nav-link">Blog</a></li>
                  <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
              </nav>
            </div> */}
                <Navbar />

                This is the user home.
                
                <div className="container-fluid padding">
                {/* in the div of container fluid */}
                    <div className="row padding" style={{zIndex:30}}>
                        {/* <CardGroup> */}
                            {listItems}
                        {/* </CardGroup> */}
                    </div>
                    
                    
                </div>
                </div>            
           
        )
    }
}

export default userhome
