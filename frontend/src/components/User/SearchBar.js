// import React, { useState, useEffect } from 'react';
// import List from './List';
// import axios from 'axios'; 


// function SearchBar() {
//     // const [search, setSearch] = useState('');
//     const [search, setSearch] = useState('');
//     const[contacts,setContacts] = useState([]);

//     const filteredContacts = search.length === 0 ? contacts
//         : contacts.filter(contact => contact.full_name.toLowerCase().includes(search.toLowerCase()));

//         useEffect(() => {
//             const API_URL = 'https://my.api.mockaroo.com/phonebook.json?key=9ac1c5f0';
//             console.log(API_URL);
//             axios
//                 .get(API_URL)
//                 .then(res => {
//                     const contacts = res.data
//                     setContacts(contacts)
//                 })
//         }, []);

//     return (
//         <div className="ml-5 mb-4">
//             {/* <h3 className="title">CONTACTS LIST</h3> */}
//                 <input                   
//                     type="text" 
//                     placeholder="Search name" 
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     />
//             {/* a contacts array passed down to List  */}
//             <List contacts={filteredContacts}/>
//         </div>
//     )
// }

// export default SearchBar


import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, data, navbarCallBackVar }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    // console.log(event.target.value);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  var onTrigger = () => {
    this.props.navbarCallBack("Welcome to GFG");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={(event)=>{
              handleFilter(event);
              navbarCallBackVar(<div></div>);
          }}
        />
        {/* <div className="searchIcon">
          {filteredData.length === 0 ? (
            <span className="glyphicon glyphicon-search"></span>
          ) : (
            <button type="button" class="btn-close" aria-label="Close"></button>
          )}
        </div> */}
        
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={"https://www.w3schools.com/"} target="_blank">
                <p>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;