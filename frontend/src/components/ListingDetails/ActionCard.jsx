import React from 'react'
import PropTypes from 'prop-types';
import { StoreContext } from '../../util/store';
import UpcomingBookings from '../UpcomingBookings';
import { displayToast } from '../../util/Toast';
import { FetchAPI } from '../../util/FetchAPI';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize';

function ActionCard ({ listingInfo, listingId }) {
  const context = React.useContext(StoreContext)
  const dayDuration = context.dayDuration[0]
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [confettiCannon, blastConfettiCannon] = React.useState(false);
  const [userBookings, setUserBookings] = React.useState([]);
  const { width, height } = useWindowSize();

  React.useEffect(async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const email = JSON.parse(localStorage.getItem('email'));

    if (token === '' || token === null) return;

    let bookings = [];
    const response = await FetchAPI('/bookings', 'GET', '', token);
    switch (response.status) {
      case 403: {
        displayToast('You are not authorised to view booking details', 'error');
        break;
      }
      case 200: {
        bookings = response.data.bookings;
        const myBookings = bookings.filter(booking => (booking.listingId === listingId && booking.dateRange.guest === email));
        setUserBookings([...myBookings]);
        break;
      }
      default: {
        displayToast('Something went wrong!', 'error');
        break;
      }
    }
  }, [confettiCannon])

  const makeNewBooking = async () => {
    blastConfettiCannon(false);
    if (JSON.parse(localStorage.getItem('token')) === '' && JSON.parse(localStorage.getItem('token')) !== null) {
      displayToast('Please log in or register to book', 'error');
      return;
    }

    if (startDate === '' || endDate === '') {
      displayToast('Please provide a start and end date', 'error');
      return;
    }

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      displayToast('Start date must be before end date.', 'error');
      return;
    }

    if (start.getFullYear() < today.getFullYear() ||
        (start.getFullYear() === today.getFullYear() && start.getMonth() < today.getMonth()) ||
        (start.getFullYear() === today.getFullYear() && start.getMonth() === today.getMonth() &&
         start.getDate() < today.getDate())) {
      displayToast('Bookings must commence after today.', 'error');
      return;
    }

    const timeDiff = (end.getTime() - start.getTime()) / (86400000);
    // Daily bookings incur a single night fee
    const totalPrice = timeDiff === 0 ? listingInfo.price : timeDiff * listingInfo.price;

    const body = {
      dateRange: { start: startDate, end: endDate, guest: JSON.parse(localStorage.getItem('email')) },
      totalPrice: totalPrice
    }

    const res = await FetchAPI(`/bookings/new/${listingId}`, 'POST', body, JSON.parse(localStorage.getItem('token')));
    switch (res.status) {
      case 403:
        displayToast('You are not authorised to make this booking', 'error');
        break;
      case 400:
        displayToast(res.data.error, 'error');
        break;
      case 200: {
        displayToast('Congratulations! Your booking request was successful!', 'success');
        blastConfettiCannon(true);
        break;
      }
      default: {
        displayToast('Something went wrong!', 'error');
        break;
      }
    }
  }

  let priceTxt = ''
  if (dayDuration === 0) priceTxt = `$${listingInfo.price} / night`
  else priceTxt = `$${listingInfo.price * dayDuration} / stay`

  return (
    <>
    {confettiCannon && <Confetti recycle={false} width={width} height={height} />}
    <div className="border p-5 w-80 h-full bg-white shadow-md self-center lg:self-center">
      <p className="text-xl font-medium">{priceTxt}</p>
      <div className="mb-3 mt-3 flex flex-col justify-center items-center">
        <div className="border  rounded-lg mb-2 p-1 w-full">
          <p className="text-gray-500">Check in</p>
          <input
            aria-label='Start date for your booking'
            placeholder="Add date"
            className="w-full focus:outline-none rounded text-gray-500 bg-white"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="border rounded-lg p-1 w-full">
          <p className="text-gray-500">Check out</p>
          <input
            aria-label='End date for your booking'
            className="w-full focus:outline-none rounded text-gray-500 bg-white"
            placeholder="Add date"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-red-400 p-3 text-white rounded-xl mt-1 w-full hover:bg-red-500"
        onClick={makeNewBooking}
      >
          Book Now
      </button>
      {JSON.parse(localStorage.getItem('token')) !== '' && JSON.parse(localStorage.getItem('token')) !== null &&
        userBookings.length !== 0 &&
       <UpcomingBookings userBookings={userBookings} />}
    </div>
    </>
  )
}

export default ActionCard

ActionCard.propTypes = {
  listingInfo: PropTypes.object,
  listingId: PropTypes.string
}
