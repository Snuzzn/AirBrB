import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Dropdown ({ title, options }) {
  const filterForAuthentication = (option) => {
    if (!('loggedIn' in option)) {
      // Option does not depend on authentication
      // For example: 'View all Listings'
      return true;
    } else if (localStorage.getItem('token') && option.loggedIn) {
      // User has logged in and option displays when logged in only
      // For example: 'My Listings' and 'Logout'
      return true;
    } else if (!localStorage.getItem('token') && !option.loggedIn) {
      // User has not logged in and option displays when not logged in only
      // For example: 'Log in' and 'Register'
      return true;
    }
    return false;
  }

  return (
    <Menu>
      <MenuButton>
        {title}
      </MenuButton>
        <MenuList className="bg-gray-100 p-4 rounded-lg animate-wiggle">
            {options.filter(filterForAuthentication)
              .map((item, index) => <Link key={index} to={item.to ? item.to : ''}>
                  <MenuItem
                  onSelect={item.onClick ? item.onClick : '' }
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
  options: PropTypes.array
}
