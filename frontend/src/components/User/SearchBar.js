import React from "react";
import axios from "axios";
import { constats } from '../../ip/config';
// import { PATIENTS_ALL_BASE_URL } from "../settings/";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: [],
      filteredData: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.p_username
          .toLowerCase()
          .includes(query.toString().toLowerCase());
      });
      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    axios
      .get(`http://${constats.AWS.ipAddress}:3000/signup`)
      .then((response) => {
        const query = this.state;
        const filteredData = response.data.filter((element) => {
          return element.p_username
            .toLowerCase()
            .includes(query.toString().toLowerCase());
        });

        this.setState({
          data: response.data,
          filteredData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    let searchCode;
    if (this.state.query.length === 0) searchCode = <div></div>;
    else {
      searchCode = (
        <div className="card" style={{ width: "100%" }}>
          <ul className="list-group list-group-flush">
            {this.state.filteredData.map((i, key) => (
              <li key={key} className="list-group-item">
                {i.p_username}
                <br /> Trial id: {i.trial_id}
                <br />
                Disease: {i.disease}
                <br /> Phase: {i.phase}
                <br /> Status: {i.p_status}
                <br /> Researcher id: {i.p_status}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <h1
              className="my-4"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Search for all patients
            </h1>
            <form>
              <input
                style={{ width: "100%", height: "42px" }}
                placeholder="Enter patient username..."
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <i className="fas fa-search"></i>
              {searchCode}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;






// // import React, { useState, useEffect } from 'react';
// // import List from './List';
// // import axios from 'axios'; 


// // function SearchBar() {
// //     // const [search, setSearch] = useState('');
// //     const [search, setSearch] = useState('');
// //     const[contacts,setContacts] = useState([]);

// //     const filteredContacts = search.length === 0 ? contacts
// //         : contacts.filter(contact => contact.full_name.toLowerCase().includes(search.toLowerCase()));

// //         useEffect(() => {
// //             const API_URL = 'https://my.api.mockaroo.com/phonebook.json?key=9ac1c5f0';
// //             console.log(API_URL);
// //             axios
// //                 .get(API_URL)
// //                 .then(res => {
// //                     const contacts = res.data
// //                     setContacts(contacts)
// //                 })
// //         }, []);

// //     return (
// //         <div className="ml-5 mb-4">
// //             {/* <h3 className="title">CONTACTS LIST</h3> */}
// //                 <input                   
// //                     type="text" 
// //                     placeholder="Search name" 
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     />
// //             {/* a contacts array passed down to List  */}
// //             <List contacts={filteredContacts}/>
// //         </div>
// //     )
// // }

// // export default SearchBar


// import React, { useState } from "react";
// import "./SearchBar.css";

// function SearchBar({ placeholder, data, navbarCallBackVar }) {
//   const [filteredData, setFilteredData] = useState([]);
//   const [wordEntered, setWordEntered] = useState("");

//   const handleFilter = (event) => {
//     const searchWord = event.target.value;
//     setWordEntered(searchWord);
//     const newFilter = data.filter((value) => {
//       return value.name.toLowerCase().includes(searchWord.toLowerCase());
//     });
//     // console.log(event.target.value);
//     if (searchWord === "") {
//       setFilteredData([]);
//     } else {
//       setFilteredData(newFilter);
//     }
//   };

//   const clearInput = () => {
//     setFilteredData([]);
//     setWordEntered("");
//   };

//   var onTrigger = () => {
//     this.props.navbarCallBack("Welcome to GFG");
//   };

//   return (
//     <div className="search">
//       <div className="searchInputs">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={wordEntered}
//           onChange={(event)=>{
//               handleFilter(event);
//               navbarCallBackVar(<div></div>);
//           }}
//         />
//         {/* <div className="searchIcon">
//           {filteredData.length === 0 ? (
//             <span className="glyphicon glyphicon-search"></span>
//           ) : (
//             <button type="button" class="btn-close" aria-label="Close"></button>
//           )}
//         </div> */}

//       </div>
//       {filteredData.length != 0 && (
//         <div className="dataResult">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <a className="dataItem" href={"https://www.w3schools.com/"} target="_blank">
//                 <p>{value.name} </p>
//               </a>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;