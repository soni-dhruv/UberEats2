import React, { useCallback, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import { ReactComponent as Logo } from "../images/uber_eats_logo.svg";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [x, setX] = useState(0);
  const [codee, setCode] = useState('');

  const showSidebar = () => setSidebar(!sidebar);

  // var code;//=<div>some data</div>;

  let navbarCallBack = (event, childData) => {
    var code = childData;
    // alert(code);
    setX(Math.random());
    setCode(childData);
  }

  return (
    <>
    
      <IconContext.Provider value={{ color: '#000' }}>
        <div class='encompass-navbar'>
          <div className='navbar' style={{width:"100%"}}>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars className="m-4" onClick={showSidebar} />
            </Link>
            <Logo /><span style={{float: 'right'}}><FaIcons.FaCartPlus />Cart </span> 
            {/* <div className="mt-3 mx-3">
              <SearchBar data={ResData} placeholder="random string" navbarCallBackVar={navbarCallBack} />
            </div> */}
          </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: '100' }} >
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {codee}
      </IconContext.Provider>
      <br />
    </>
  );
}

export default Navbar;