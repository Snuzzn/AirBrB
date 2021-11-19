import React from 'react';
import { HiStar } from 'react-icons/hi';
import PropTypes from 'prop-types';

const ReviewSummary = ({ score }) => {
  return (
    <>
      <HiStar alt="star icon to represent users' rating of listing" className="text-red-400 text-xl" />
      <p className="text-gray-600 font-medium text-2xl hover:text-red-400">{score}</p>
    </>
  )
}

export default ReviewSummary;

ReviewSummary.propTypes = {
  score: PropTypes.string
}
