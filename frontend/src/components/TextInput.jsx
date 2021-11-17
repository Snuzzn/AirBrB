import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ label, type, placeholder = 'Please enter details', setState }) => {
  return (
      <input
        aria-label={label}
        className="bg-gray-100 focus:bg-transparent w-full text-md block mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
        type={type}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
  )
}

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  setState: PropTypes.func
}
