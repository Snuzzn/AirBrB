import React from 'react'
import PropTypes from 'prop-types';
import { HeaderRow, BodyRow } from './TableComponents';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { FetchAPI } from '../../util/FetchAPI';
import { displayToast } from '../../util/Toast';

function BookingTable ({ bookings, isHistory, getBookings }) {
  let filteredBookings = []
  if (isHistory) {
    filteredBookings = bookings.sort((a, b) => a.status > b.status).filter((item) => item.status === 'accepted' || item.status === 'declined')
  } else {
    filteredBookings = bookings.filter((item) => item.status === 'pending')
  }

  // accept or decline booking
  const handleBookingAction = async (id, action) => {
    const response = await FetchAPI(`/bookings/${action}/${id}`, 'PUT', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast(`Could not ${action} booking ${id}`, 'error')
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
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <HeaderRow/>
        <tbody>
          {filteredBookings.map((item) => (
              <tr className="border-b" key={item.id}>
                <BodyRow item={item}/>
                <td className="p-2 flex gap-2 items-center">
                  {isHistory
                    ? <span className={`'text-sm font-semibold rounded-lg px-2 p-1 ${item.status === 'accepted'
                      ? 'bg-green-100 text-green-400'
                      : 'bg-red-100 text-red-400'}`}>{item.status.toUpperCase()}</span>
                    : <>
                        <span className="bg-yellow-100 text-yellow-400 text-sm font-semibold rounded-lg px-2 p-1">{item.status.toUpperCase()}</span>
                        <AiFillCheckCircle className="text-green-400 text-lg cursor-pointer hover:animate-pulse hover:text-green-500"
                          onClick={() => handleBookingAction(item.id, 'accept')}/>
                        <AiFillCloseCircle className="text-red-400 text-lg cursor-pointer hover:animate-pulse hover:text-red-500"
                          onClick={() => handleBookingAction(item.id, 'decline')}/>
                      </>}
                </td>
            </tr>))
            }
        </tbody>
      </table>
    </div>
  )
}

export default BookingTable

BookingTable.propTypes = {
  bookings: PropTypes.array,
  isHistory: PropTypes.bool,
  getBookings: PropTypes.func
}
