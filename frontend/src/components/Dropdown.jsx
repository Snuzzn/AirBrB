import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import PropTypes from 'prop-types';

export default function Dropdown ({ title, options }) {
  return (
      <Menu>
        <MenuButton>
          {title}
        </MenuButton>
          <MenuList className="bg-gray-100 p-4 rounded-lg animate-wiggle">
              {options.map((item, index) => <MenuItem key={index}
              className="hover:bg-gray-200 flex gap-2 items-center cursor-pointer p-3 rounded">
              {item.icon}
              {item.text}
              </MenuItem>)}
          </MenuList>
      </Menu>
  );
}

Dropdown.propTypes = {
  title: PropTypes.object,
  options: PropTypes.array
}
