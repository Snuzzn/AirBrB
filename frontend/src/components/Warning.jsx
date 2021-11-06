import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({ warnText }) => {
  return (
    <>
    <p className="text-red-500" >{warnText}</p>
    </>
  )
}

export default Warning;

Warning.propTypes = {
  warnText: PropTypes.string,
}
