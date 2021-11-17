import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineRateReview } from 'react-icons/md';

const Listing = ({ thumbnail, reviews = [], title, price }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      <div className="relative -mb-8 text-right pr-4 cursor">
        <span id="listing-price" className="bg-red-400 cursor-default text-white rounded-xl transit pb-1 pt-1 pl-2 pr-2 transition duration-500 ease-in-out hover:text-red-400 hover:bg-white">${price}</span>
      </div>
      <div className="">
        <img className="object-cover h-60 w-80 rounded-2xl" src={thumbnail} alt="Image of a your listing" />
      </div>
      <div className="relative mt-1 flex justify-between pl-2 pr-2">
        <div className="text-lg">
          {title}
        </div>
        <div
          className="flex flex-row text-center items-center text-gray-500"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span
            className="inline-block pr-1 text-lg"
            aria-label="Number of reviews"
            id="review-length"
          >
            {reviews.length}
          </span>
          <MdOutlineRateReview id="review-number-icon" title="Icon representing number of reviews" />
          {showTooltip && <div className="absolute rounded text-xs shadow-lg p-1 bg-gray-100 text-black bottom-7">Review Count</div>}
        </div>
      </div>
    </>
  )
}

export default Listing;

Listing.propTypes = {
  thumbnail: PropTypes.string,
  reviews: PropTypes.array,
  title: PropTypes.string,
  price: PropTypes.number
}
