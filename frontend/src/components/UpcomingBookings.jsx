import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const UpcomingBookings = ({ userBookings }) => {
  const formatDate = (date) => {
    const unformatted = new Date(date);
    return `${unformatted.getDate()}/${unformatted.getMonth() + 1}/${unformatted.getFullYear()}`
  }

  return (
    <Popover className="relative">
      <Popover.Button className="border-red-400 border p-3 text-red-400 rounded-xl mt-3 w-full hover:bg-red-50">Upcoming Bookings</Popover.Button>
      <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
      <Popover.Panel className="absolute z-10 bg-color-white mt-3 rounded-lg shadow-lg">
        {userBookings.map((booking, idx) =>
        <div key={idx} className="text-gray-500 bg-white opacity-90 p-1 rounded-lg">
          <div className="pb-1 pl-2 pt-1">
            Your booking from {formatDate(booking.dateRange.start)} to {formatDate(booking.dateRange.end)} is
            <span className="font-medium">
              {booking.status === 'pending' ? <span className="text-yellow-600"> pending</span> : ''}
              {booking.status === 'declined' ? <span className="text-red-600"> declined</span> : ''}
              {booking.status === 'accepted' ? <span className="text-green-600"> accepted</span> : ''}
            </span>
          </div>
        </div>
        )}
      </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default UpcomingBookings;

UpcomingBookings.propTypes = {
  userBookings: PropTypes.array
}
