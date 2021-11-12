import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { FetchAPI } from '../util/FetchAPI';
import { displayToast } from '../util/Toast';
import { HiCake } from 'react-icons/hi'
import { MdOutlineAccessTimeFilled } from 'react-icons/md'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = React.useState({})
  const [bookings, setBookings] = React.useState([])

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
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [])

  React.useEffect(async () => {
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
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [])
  const declineBooking = (id) => {
    console.log(id);
  }

  console.log(bookings);
  return (
    <>
      { Object.keys(listing).length !== 0 && bookings.length !== 0 &&
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
            <div className="bg-white  rounded-lg shadow flex-1 flex justify-start">
              <div className="flex gap-6 items-center ml-9">
                <div className="p-5 rounded-2xl bg-red-100">
                  <HiCake className="text-red-400 text-2xl"/>
                </div>
                <div className="">
                  <p className="text-gray-500 font-light text-sm">Listing Age</p>
                  <p className="text-xl font-bold">21 days</p>
                </div>
              </div>
            </div>
            <div className="bg-white  rounded-lg shadow flex-1 flex justify-start">
              <div className="flex gap-6 items-center ml-9">
                <div className="p-5 rounded-2xl bg-blue-100">
                  <MdOutlineAccessTimeFilled className="text-blue-400 text-2xl"/>
                </div>
                <div className="">
                  <p className="text-gray-500 font-light text-sm">Days Booked</p>
                  <p className="text-xl font-bold">21 days</p>
                </div>
              </div>
            </div>
            <div className="bg-white  rounded-lg shadow flex-1 flex justify-start">
              <div className="flex gap-6 items-center ml-9">
                <div className="p-5 rounded-2xl bg-green-100">
                  <FaMoneyBillAlt className="text-green-400 text-2xl"/>
                </div>
                <div className="">
                  <p className="text-gray-500 font-light text-sm">Yearly Profit</p>
                  <p className="text-xl font-bold">$21</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl  font-semibold mb-2">Pending Requests</h1>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2 font-semibold">Guest</th>
                  <th className="p-2 font-semibold">Check In</th>
                  <th className="p-2 font-semibold">Check Out</th>
                  <th className="p-2 font-semibold">Price</th>
                  <th className="p-2 font-semibold">Status</th>
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
                      <span className="bg-yellow-100 text-yellow-400 text-sm font-semibold rounded-lg px-2 p-1">PENDING</span>
                      <AiFillCheckCircle className="text-green-400 text-lg cursor-pointer hover:animate-pulse hover:text-green-500"/>
                      <AiFillCloseCircle className="text-red-400 text-lg cursor-pointer hover:animate-pulse hover:text-red-500"
                        onClick={() => declineBooking(item.id)}/>
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
