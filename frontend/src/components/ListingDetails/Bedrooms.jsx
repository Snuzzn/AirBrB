import React from 'react'
import { IoBedOutline } from 'react-icons/io5'
import PropTypes from 'prop-types';

function Bedrooms ({ listingInfo }) {
  let bedrooms = []
  if (listingInfo.metadata != null) bedrooms = listingInfo.metadata.bedrooms
  return (
    <div className="flex gap-4">
      { bedrooms.map((bedroom) =>
        <React.Fragment key={bedroom.title}>
          <div className="h-40 w-60 border p-4 rounded-xl flex flex-col justify-evenly">
            <IoBedOutline className="text-5xl text-gray-600"/>
            <div>
              <p className="text-lg text-gray-700" id={bedroom.title}>{bedroom.title}</p>
              <p className="text-gray-600 font-light" id={bedroom.title + 'count'}>{bedroom.count} beds</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Bedrooms

Bedrooms.propTypes = {
  listingInfo: PropTypes.object,
}
