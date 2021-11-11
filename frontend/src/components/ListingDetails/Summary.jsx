import React from 'react'
import { MdOutlineDoorBack, MdOutlineShower, MdOutlineBed } from 'react-icons/md'
import PropTypes from 'prop-types';

function Summary ({ listingInfo }) {
  const bedrooms = listingInfo.metadata.bedrooms
  let numBedrooms = 0
  bedrooms.forEach(item => {
    numBedrooms += parseInt(item.count)
  });

  return (
    <div className="mt-2 flex items-center gap-3 text-2xl font-medium text-gray-800">
      <p>
        <span>{ listingInfo.metadata.type }</span>
        <span> · </span>
      </p>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg">{ listingInfo.metadata.bedrooms.length }</p>
        <MdOutlineDoorBack/>
      </div>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg">{numBedrooms}</p>
        <MdOutlineBed/>
      </div>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg">{ listingInfo.metadata.bathrooms }</p>
        <MdOutlineShower/>
      </div>
    </div>
  )
}

export default Summary

Summary.propTypes = {
  listingInfo: PropTypes.object,
}
