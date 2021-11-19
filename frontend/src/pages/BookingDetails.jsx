import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { FetchAPI } from '../util/FetchAPI';
import { displayToast } from '../util/Toast';
import { HiCake } from 'react-icons/hi'
import { MdOutlineAccessTimeFilled } from 'react-icons/md'
import { FaMoneyBillAlt } from 'react-icons/fa'
import BookingInfoCard from '../components/BookingDetails/BookingInfoCard';
import BookingTable from '../components/BookingDetails/BookingTable';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = React.useState({})
  const [bookings, setBookings] = React.useState([])
  const [profit, setProfit] = React.useState(0)
  const [age, setAge] = React.useState(0)
  const [daysBooked, setDaysBooked] = React.useState(0)

  // get listing info
  React.useEffect(async () => {
    const response = await FetchAPI(`/listings/${id}`, 'GET', '', '');
    switch (response.status) {
      case 400:
        displayToast('Could not open listing to edit', 'error')
        break;
      case 200: {
        const listing = response.data.listing
        if (JSON.stringify(listing) === '{}') {
          displayToast('Could not find listing', 'error')
          navigate('/hosted-listings')
          return;
        }
        setListing(listing)
        setAge(calculateDayDiff(listing.postedOn, ''));
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [])

  // get relevant booking info
  React.useEffect(async () => {
    getBookings()
  }, [])

  const getBookings = async () => {
    const response = await FetchAPI('/bookings', 'GET', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not open listing to edit', 'error')
        break;
      case 200: {
        const bookings = response.data.bookings
        if (JSON.stringify(bookings) === '{}') { // no bookings found
          displayToast('Could not any bookings', 'error')
          navigate('/hosted-listings')
          return;
        }
        const relevantBookings = []
        for (const item of bookings) { // get bookings of current listing id
          if (item.listingId === id) relevantBookings.push(item)
        }
        setBookings(relevantBookings)

        // find total profit and days booked
        let newProfit = 0
        let newDaysBooked = 0
        // go through each booking
        for (const item of relevantBookings) {
          if (item.status === 'accepted') {
            const numDays = calculateDayDiff(item.dateRange.start, item.dateRange.end)
            let i = 0
            const currDate = new Date(item.dateRange.start)
            // calculate profit and days booked by going through each day of the booking
            while (i < numDays) {
              const daysAgo = calculateDayDiff('yearStart', currDate.toDateString())
              if (daysAgo < 365) { // day is in the current calendar year
                // increment the daily profit and days booked to total
                newProfit += item.totalPrice / numDays
                newDaysBooked += 1
              }
              currDate.setDate(currDate.getDate() + 1)
              i += 1
            }
          }
        }
        setProfit(newProfit)
        setDaysBooked(newDaysBooked)
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  // return number of days between 2 date strings
  const calculateDayDiff = (startDate, endDate) => {
    let start = new Date(new Date().getFullYear(), 0, 1); // start of year
    let end = new Date() // today
    if (endDate !== '') end = new Date(endDate)
    if (startDate !== 'yearStart') start = new Date(startDate)
    return Math.floor((end - start) / (1000 * 60 * 60 * 24))
  }

  return (
    <>
      { Object.keys(listing).length !== 0 &&
      <Fade>
        <div className="flex flex-col w-full max-w-6xl gap-6">
          <div className="flex items-center gap-2">
            <Link to="/hosted-listings">
              <IoChevronBack/>
            </Link>
            <div className="text-3xl font-medium  text-gray-700">
              {listing.title}
            </div>
          </div>
          <div className="flex flex-col h-96 lg:h-36 lg:flex-row w-full gap-5">
            <BookingInfoCard title="Listing Age" message={age + ' days'} icon={<HiCake alt='cake icon represents age of booking' className="text-red-400 text-2xl"/>} bg="bg-red-100" />
            <BookingInfoCard title="Days Booked" message={daysBooked + ' days'} icon={<MdOutlineAccessTimeFilled alt='clock icon represents number of day booking' className="text-blue-400 text-2xl"/>} bg="bg-blue-100" />
            <BookingInfoCard title="Yearly Profit" message={'$ ' + profit} icon={<FaMoneyBillAlt alt='cash icon represents yearly profit' className="text-green-400 text-2xl"/>} bg="bg-green-100" />
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 font-medium mb-2">Pending Requests</h1>
            <BookingTable bookings={bookings} isHistory={false} getBookings={getBookings}/>
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 font-medium mb-2">History</h1>
            <BookingTable bookings={bookings} isHistory={true} getBookings={getBookings}/>
          </div>
        </div>
      </Fade>
      }
    </>
  );
}

export default BookingDetails;
