import React from 'react';
import { HiStar } from 'react-icons/hi';
import PropTypes from 'prop-types';

const ReviewSummary = ({ score }) => {
  return (
    <>
      <HiStar className="text-red-400 text-xl" />
      <p className="text-gray-600 font-medium text-2xl hover:text-red-400">{score}</p>
    </>
  )
}

export default ReviewSummary;

ReviewSummary.propTypes = {
  score: PropTypes.number
}
