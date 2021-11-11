import React from 'react'
import { HiStar, HiUserCircle } from 'react-icons/hi'
import locationReview from '../../images/locationReview.svg'
import PropTypes from 'prop-types';

function Reviews ({ listingInfo }) {
  return (
    <div className="flex flex-col gap-9 mb-10" id="reviews">
      { listingInfo.reviews.length !== 0
        ? (<div className="flex gap-5 items-center">
          <div className="w-10 self-start">
            <HiUserCircle size="3em" className="text-gray-600 " />
          </div>
          <div>
            <div className="flex gap-1">
              <HiStar className="text-red-400 text-xl"/>
              <HiStar className="text-red-400 text-xl"/>
              <HiStar className="text-red-400 text-xl"/>
              <HiStar className="text-gray-400 text-xl"/>
              <HiStar className="text-gray-400 text-xl"/>
            </div>
            <p className="text-gray-600 max-w-5xl">This place was pretty cool. Not enough bats though. This place was pr though. This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.</p>
          </div>
        </div>)
        : (<div className="flex flex-col items-center">
          <img src={locationReview} alt="Person next to house below a card with a navigation symbol on top" className="w-1/2 sm:w-1/3 lg:w-1/4" />
          <p>No reviews yet...</p>
        </div>)
      }
    </div>
  )
}

export default Reviews

Reviews.propTypes = {
  listingInfo: PropTypes.object,
}
