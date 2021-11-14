import React from 'react'

import PropTypes from 'prop-types';

function BookingInfoCard ({ title, message, icon, bg }) {
  return (
    <div className="flex flex-col h-96 lg:h-36 lg:flex-row w-full gap-5">
      <div className="bg-white  rounded-lg shadow flex-1 flex justify-start">
        <div className="flex gap-6 items-center ml-9">
          <div className={bg + ' p-5 rounded-2xl'}>
            {icon}
          </div>
          <div className="">
            <p className="text-gray-500 font-light text-sm">{title}</p>
            <p className="text-xl font-bold">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingInfoCard

BookingInfoCard.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.node,
  bg: PropTypes.string
}
