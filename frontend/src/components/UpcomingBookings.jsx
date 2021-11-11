import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const UpcomingBookings = ({ userBookings }) => {
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [declined, setDeclined] = React.useState([]);

  React.useEffect(() => {
    setApproved([...userBookings.filter(booking => booking.status === 'accepted')]);
    setPending([...userBookings.filter(booking => booking.status === 'pending')]);
    setDeclined([...userBookings.filter(booking => booking.status === 'declined')]);

    console.log(pending);
    console.log(approved);
    console.log(declined);
  }, [])

  console.log(userBookings);
  return (
    <>
      { (pending !== [] || approved !== [] || declined !== []) &&
      <Popover className="relative">
        <Popover.Button className="bg-red-400 p-3 text-white rounded-xl mt-3 w-full hover:bg-red-500">Upcoming Bookings</Popover.Button>
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
          <div key={idx} className="text-gray-500 bg-white p-1 rounded-lg">
            <div className="pb-1 pt-1">Your booking from {booking.dateRange.start} to {booking.dateRange.end} is <span className="font-semibold">{booking.status}</span></div>
          </div>
          )}
        </Popover.Panel>
        </Transition>
      </Popover>
  }
  </>
  )
}

export default UpcomingBookings;

UpcomingBookings.propTypes = {
  userBookings: PropTypes.array
}
