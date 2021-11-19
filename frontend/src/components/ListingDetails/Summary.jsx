import React from 'react'
import { MdOutlineDoorBack, MdOutlineShower, MdOutlineBed } from 'react-icons/md'
import PropTypes from 'prop-types';
import Tooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';

function Summary ({ listingInfo }) {
  const bedrooms = listingInfo.metadata.bedrooms
  let numBedrooms = 0
  bedrooms.forEach(item => {
    numBedrooms += parseInt(item.count)
  });
  const bedroomsTxt = `${listingInfo.metadata.bedrooms.length} bedrooms`
  const bedsTxt = `${numBedrooms} beds`
  const bathroomsTxt = `${listingInfo.metadata.bathrooms} bathrooms`
  return (
    <div className="mt-2 flex items-center gap-3 text-2xl font-medium text-gray-800">
      <p>
        <span>{ listingInfo.metadata.type }</span>
        <span> · </span>
      </p>
      <Tooltip label={bedroomsTxt} className="animate-wiggle">
        <div className="flex items-center gap-1 text-xl text-gray-600">
          <p className="text-lg">{ listingInfo.metadata.bedrooms.length }</p>
          <MdOutlineDoorBack alt="door icon which represents number of bedrooms"/>
        </div>
      </Tooltip>
      <Tooltip label={bedsTxt} className="animate-wiggle">
        <div className="flex items-center gap-1 text-xl text-gray-600">
          <p className="text-lg">{numBedrooms}</p>
          <MdOutlineBed alt="bed icon which represents number of beds"/>
        </div>
      </Tooltip>
      <Tooltip label={bathroomsTxt} className="animate-wiggle">
        <div className="flex items-center gap-1 text-xl text-gray-600">
          <p className="text-lg">{ listingInfo.metadata.bathrooms }</p>
          <MdOutlineShower alt="shower icon which represents number of bathrooms"/>
        </div>
      </Tooltip>
    </div>
  )
}

export default Summary

Summary.propTypes = {
  listingInfo: PropTypes.object,
}
