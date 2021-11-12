import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { FetchAPI } from '../util/FetchAPI';
import { displayToast } from '../util/Toast';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { HiCake } from 'react-icons/hi'
import { MdOutlineAccessTimeFilled } from 'react-icons/md'
import { FaMoneyBillAlt } from 'react-icons/fa'
import BookingInfoCard from '../components/BookingInfoCard';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = React.useState({})
  const [bookings, setBookings] = React.useState([])
  const [profit, setProfit] = React.useState(0)
  const [age, setAge] = React.useState(0)
  const [daysBooked, setDaysBooked] = React.useState(0)

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

  const getBookings = async () => {
    const response = await FetchAPI('/bookings', 'GET', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not open listing to edit', 'error')
        break;
      case 200: {
        const bookings = response.data.bookings
        if (JSON.stringify(bookings) === '{}') {
          displayToast('Could not any bookings', 'error')
          navigate('/hosted-listings')
          return;
        }
        const relevantBookings = []
        for (const item of bookings) {
          if (item.listingId === id) relevantBookings.push(item)
        }
        setBookings(relevantBookings)
        let price = 0
        let newDaysBooked = 0
        for (const item of relevantBookings) {
          if (item.status === 'accepted') {
            price += item.totalPrice
            newDaysBooked += calculateDayDiff(item.dateRange.start, item.dateRange.end)
          }
          // console.log(calculateDayDiff(new Date()));
        }
        setProfit(price)
        setDaysBooked(newDaysBooked)
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  React.useEffect(async () => {
    getBookings()
  }, [])

  const declineBooking = async (id) => {
    const response = await FetchAPI(`/bookings/decline/${id}`, 'PUT', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not open decline booking', 'error')
        break;
      case 200: {
        console.log(response.data);
        getBookings()
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  const calculateDayDiff = (startDate, endDate) => {
    let end = new Date()
    if (endDate !== '') end = new Date(endDate)
    return Math.floor((end - new Date(startDate)) / (1000 * 60 * 60 * 24))
  }

  const acceptBooking = async (id) => {
    const response = await FetchAPI(`/bookings/accept/${id}`, 'PUT', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not open decline booking', 'error')
        break;
      case 200: {
        console.log(response.data);
        getBookings()
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
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
            <BookingInfoCard message={age + ' days'} icon={<HiCake className="text-red-400 text-2xl"/>} bg="bg-red-100" />
            <BookingInfoCard message={daysBooked + ' days'} icon={<MdOutlineAccessTimeFilled className="text-blue-400 text-2xl"/>} bg="bg-blue-100" />
            <BookingInfoCard message={'$ ' + profit} icon={<FaMoneyBillAlt className="text-green-400 text-2xl"/>} bg="bg-green-100" />
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 font-medium mb-2">Pending Requests</h1>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2 font-semibold text-gray-600">Guest</th>
                  <th className="p-2 font-semibold text-gray-600">Check In</th>
                  <th className="p-2 font-semibold text-gray-600">Check Out</th>
                  <th className="p-2 font-semibold text-gray-600">Price</th>
                  <th className="p-2 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter(item => item.status === 'pending').map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="p-2">{item.dateRange.guest}</td>
                    <td className="p-2">{item.dateRange.start}</td>
                    <td className="p-2">{item.dateRange.end}</td>
                    <td className="p-2">{item.totalPrice}</td>
                    <td className="p-2 flex gap-2 items-center">
                      <span className="bg-yellow-100 text-yellow-400 text-sm font-semibold rounded-lg px-2 p-1">{item.status.toUpperCase()}</span>
                      <AiFillCheckCircle className="text-green-400 text-lg cursor-pointer hover:animate-pulse hover:text-green-500"
                        onClick={() => acceptBooking(item.id)}/>
                      <AiFillCloseCircle className="text-red-400 text-lg cursor-pointer hover:animate-pulse hover:text-red-500"
                        onClick={() => declineBooking(item.id)}/>
                    </td>
                </tr>))
                }
              </tbody>
            </table>
          </div>
          <div>
            <h1 className="text-2xl text-gray-700 font-medium mb-2">History</h1>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2 font-semibold text-gray-600">Guest</th>
                  <th className="p-2 font-semibold text-gray-600">Check In</th>
                  <th className="p-2 font-semibold text-gray-600">Check Out</th>
                  <th className="p-2 font-semibold text-gray-600">Price</th>
                  <th className="p-2 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
              {bookings.filter(item => item.status === 'accepted').map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="p-2">{item.dateRange.guest}</td>
                    <td className="p-2">{item.dateRange.start}</td>
                    <td className="p-2">{item.dateRange.end}</td>
                    <td className="p-2">{item.totalPrice}</td>
                    <td className="p-2 flex gap-2 items-center">
                      <span className="bg-green-100 text-green-400 text-sm font-semibold rounded-lg px-2 p-1">{item.status.toUpperCase()}</span>
                    </td>
                </tr>))
                }
                {bookings.filter(item => item.status === 'declined').map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="p-2">{item.dateRange.guest}</td>
                    <td className="p-2">{item.dateRange.start}</td>
                    <td className="p-2">{item.dateRange.end}</td>
                    <td className="p-2">{item.totalPrice}</td>
                    <td className="p-2 flex gap-2 items-center">
                      <span className="bg-red-100 text-red-400 text-sm font-semibold rounded-lg px-2 p-1">{item.status.toUpperCase()}</span>
                    </td>
                </tr>))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Fade>
      }
    </>
  );
}

export default BookingDetails;
