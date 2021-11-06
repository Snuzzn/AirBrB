import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Dropdown ({ title, options }) {
  return (
    <Menu>
      <MenuButton>
        {title}
      </MenuButton>
        <MenuList className="bg-gray-100 p-4 rounded-lg animate-wiggle">
            {options.filter((option) => localStorage.getItem('token') ? option.loggedIn : !option.loggedIn)
              .map((item, index) => <Link key={index} to={item.to ? item.to : ''}>
                  <MenuItem
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
