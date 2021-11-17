import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

const LoginButton = ({ handleClick, buttonText = 'Submit' }) => {
  return (
    <button
    type="button"
    className="items-center flex justify-center w-full px-4 py-2 text-sm bg-red-300 border border-transparent rounded-lg hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    onClick={handleClick}
    >
      <div className="flex-1">
        {buttonText}
      </div>
      <AiOutlineArrowRight className="text-lg" aria-label="Submit login icon: arrow moving right" />
    </button>
  )
}

export default LoginButton;

LoginButton.propTypes = {
  handleClick: PropTypes.func,
  buttonText: PropTypes.string
}
