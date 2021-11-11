import React from 'react'
import PropTypes from 'prop-types';
import { StoreContext } from '../../util/store';

function ActionCard ({ listingInfo }) {
  const context = React.useContext(StoreContext)
  const dayDuration = context.dayDuration[0]

  let priceTxt = ''
  if (dayDuration === 0) priceTxt = `$${listingInfo.price} / night`
  else priceTxt = `$${listingInfo.price * dayDuration} / stay`

  return (
    <div className="border p-5 w-80 h-full bg-white shadow-md self-center sm:self-start lg:self-center">
      <p className="text-xl font-medium">{priceTxt}</p>
      <div className="flex mb-3 mt-3">
        <div className="border  rounded p-3 w-1/2">
          <p className="text-gray-500">Check in</p>
          <input type="text" placeholder="Add date" className="w-full "/>
        </div>
        <div className="border rounded  p-3 w-1/2">
          <p className="text-gray-500">Check out</p>
          <input type="text" placeholder="Add date" className="w-full "/>
        </div>
      </div>
      <button className="bg-red-400 p-3 text-white rounded-xl mt-3 w-full hover:bg-red-500">Book Now</button>
    </div>
  )
}

export default ActionCard

ActionCard.propTypes = {
  listingInfo: PropTypes.object,
}
