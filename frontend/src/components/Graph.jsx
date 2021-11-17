import React from 'react'
import { Line } from 'react-chartjs-2';
import { FetchAPI } from '../util/FetchAPI';
import { displayToast } from '../util/Toast';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

function Graph ({ listingIds }) {
  const [profit, setProfit] = React.useState([])
  const data = {
    labels: Array.from(Array(31).keys()),
    datasets: [{
      data: profit,
      borderWidth: 1,
      borderColor: '#1CB06C',
      fill: true,
      backgroundColor: '#D1EFE0'
    }]
  };

  React.useEffect(() => {
    const fetchBookings = async () => {
      const response = await FetchAPI('/bookings', 'GET', '', JSON.parse(localStorage.getItem('token')));
      switch (response.status) {
        case 400:
          displayToast('Could not open listing to edit', 'error')
          break;
        case 200: {
          const bookings = response.data.bookings
          const month = new Array(32).fill(0)
          for (const item of bookings) { // get bookings of current listing id
            // check if booking is for a hosted listing and it is accepted
            if (listingIds.includes(parseInt(item.listingId)) && item.status === 'accepted') {
              const numDays = calculateDayDiff(item.dateRange.start, item.dateRange.end)
              let i = 0
              const currDate = new Date(item.dateRange.start)
              // calculate profit on daily basis
              while (i < numDays) {
                const daysAgo = calculateDayDiff(currDate, '')
                // increment the daily profit of this booking to the appropriate day in the x-axis
                month[daysAgo] += item.totalPrice / numDays
                currDate.setDate(currDate.getDate() + 1)
                i += 1
              }
            }
          }
          setProfit(month)
          break;
        }
        default:
          displayToast('Something went wrong!', 'error');
      }
    }
    fetchBookings()
  }, [])

  // return number of days between 2 date strings
  const calculateDayDiff = (startDate, endDate) => {
    let end = new Date()
    end.setHours(11);
    end.setMinutes(0);
    end.setMilliseconds(0);
    if (endDate !== '') end = new Date(endDate) // today
    return Math.floor((end - new Date(startDate)) / (1000 * 60 * 60 * 24))
  }

  return (
    <Fade>
      <div className="w-full sm:w-1/2 lg:w-3/4 h-96 flex flex-col items-center m-auto mt-5 text-xl mb-14">
        <h2 className="text-gray-700 font-medium">Profit from Last Month</h2>
        <Line
          data={data}
          options={graphConfig}
        />
        <p className="text-gray-600 text-xs mt-1 italic">*Profits calculated on a daily basis, commencing on the first day of the booking</p>
      </div>
    </Fade>
  )
}

export default Graph

Graph.propTypes = {
  listingIds: PropTypes.array,
}

const graphConfig = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },

  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value, index, values) {
          return '$' + value;
        }
      },
      title: {
        text: 'Profit',
        display: true,
      }
    },
    x: {
      title: {
        text: 'Days ago',
        display: true,
      }
    }
  }
}
