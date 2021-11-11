import React from 'react'
import { HiStar } from 'react-icons/hi'
import { Link } from 'react-scroll'
import PropTypes from 'prop-types';

function Header ({ listingInfo }) {
  let score = 0
  listingInfo.reviews.forEach(element => {
    score += parseInt(element.score)
  });
  if (score !== 0) {
    score = score / listingInfo.reviews.length
  } else {
    score = '-'
  }

  return (
    <div className="flex items-center  text-gray-700 justify-between">
      <div>
        <p className="text-3xl font-medium">{listingInfo.title}</p>
        <p className="text-gray-500">{listingInfo.address.street}
          <span className="text-gray-500"> · {listingInfo.address.city}</span>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 ">
          <HiStar className="text-red-400 text-xl"/>
          <p className="text-gray-600 font-medium text-2xl">{score}</p>
        </div>
        <Link to="reviews" smooth={true} duration={1000}>
          <p className="text-sm text-gray-500 hover:text-red-400 cursor-pointer">{listingInfo.reviews.length} reviews</p>
        </Link>
      </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  listingInfo: PropTypes.object,
}
