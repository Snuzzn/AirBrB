import React from 'react';
import { HiStar } from 'react-icons/hi';
import PropTypes from 'prop-types';

const HostReviewSummary = ({ score }) => {
  return (
  <>
    <HiStar className="text-red-400 text-xl"/>
    <span className="font-italic text-black hover:text-red-400">{score}</span>
  </>
  )
}

export default HostReviewSummary;

HostReviewSummary.propTypes = {
  score: PropTypes.string
}
