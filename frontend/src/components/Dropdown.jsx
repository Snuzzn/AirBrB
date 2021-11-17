import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Dropdown ({ title, options, tokenState }) {
  const filterForAuthentication = (option) => {
    if (!('loggedIn' in option)) {
      // Option does not depend on authentication
      // For example: 'View all Listings'
      return true;
    }

    if (tokenState && option.loggedIn === true) {
      // User has logged in and option displays when logged in only
      // For example: 'My Listings' and 'Logout'
      return true;
    } else if (!tokenState && option.loggedIn === false) {
      // User has not logged in and option displays when not logged in only
      // For example: 'Log in' and 'Register'
      return true;
    }
    return false;
  }

  const email = JSON.parse(localStorage.getItem('email'))
  if (email !== '') { // logged in
    const src = `https://avatars.dicebear.com/api/gridy/${email}.svg`
    title = <img src={src} alt="" className="w-10 h-10 rounded-3xl p-2  bg-gray-200 " />
  }

  return (
    <Menu>
      <MenuButton id='open-dropdown'>
        {title}
      </MenuButton>
        <MenuList id='dropdown-menu' className="bg-gray-100 p-4 rounded-lg animate-wiggle">
            {options.filter(filterForAuthentication)
              .map((item, index) => <Link key={index} to={item.to ? item.to : ''}>
                  <MenuItem
                  onSelect={item.onClick ? item.onClick : () => {} }
                  className="hover:bg-gray-200 flex gap-2 items-center cursor-pointer p-3 rounded">
                  {item.icon}
                  {item.text}
                  </MenuItem>
                  </Link>)
            }
        </MenuList>
    </Menu>
  );
}

Dropdown.propTypes = {
  title: PropTypes.object,
  options: PropTypes.array,
  tokenState: PropTypes.string
}
