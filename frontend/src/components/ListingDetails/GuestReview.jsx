import React from 'react';
import PropTypes from 'prop-types';
import { HiStar, HiUserCircle } from 'react-icons/hi'

const GuestReview = ({ review }) => {
  return (
    <div className="flex gap-5 items-center">
      <div className="w-10 self-start">
        <HiUserCircle size="3em" className="text-gray-600 " />
      </div>
      <div>
        <div className="flex gap-1">
          <HiStar className="text-red-400 text-xl"/>
          {review.score >= 2 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
          {review.score >= 3 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
          {review.score >= 4 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
          {review.score === 5 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
        </div>
        <p className="text-gray-600 max-w-5xl">{review.review}</p>
        <p className="font-light text-gray-400 italic text-sm">{review.reviewer}</p>
      </div>
    </div>
  )
}

export default GuestReview;

GuestReview.propTypes = {
  review: PropTypes.object,
}
