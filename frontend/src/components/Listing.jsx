import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineRateReview } from 'react-icons/md';

const Listing = ({ id, thumbnail, reviews, title, price }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <>
      <div className="relative -mb-8 text-right pr-4">
        <span className="bg-red-400 cursor-default text-white rounded-xl p-1 hover:text-red-400 hover:bg-white">${price}</span>
      </div>
      <img className="object-cover h-60 w-80 rounded-2xl" src={thumbnail} alt="Image of a your listing" />
      <div className="relative mt-1 flex justify-between pl-2 pr-2">
        <div className="font-semibold">
          {title}
        </div>
        <div
          className="flex flex-row text-center items-center text-gray-500"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span
            className="inline-block pr-1 font-semibold"
            aria-label="Number of reviews"
          >
            {reviews.length}
          </span>
          <MdOutlineRateReview aria-label="Icon representing number of reviews" />
          {showTooltip && <div className="absolute rounded text-xs shadow-lg p-1 bg-gray-100 text-black bottom-7">Review Count</div>}
        </div>
      </div>
    </>
  )
}

export default Listing;

Listing.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  reviews: PropTypes.array,
  title: PropTypes.string,
  price: PropTypes.number
}
