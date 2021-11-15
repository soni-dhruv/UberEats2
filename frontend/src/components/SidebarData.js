import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import cookie from 'react-cookies';

export const SidebarData = [
  {
    title: 'Home',
    path: '/userhome',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',

    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Favourite',
    path: '/favourite',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    // cookie.remove(CONFIG.UBER_EATS_USER_COOKIE_KEY, { path: '/' }),
    // cookie.remove(CONFIG.UBER_EATS_USER_TYPE_KEY, { path: '/' })
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // }
];
