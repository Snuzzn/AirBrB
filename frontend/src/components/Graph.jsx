import React from 'react'
import { Line } from 'react-chartjs-2';
import { FetchAPI } from '../util/FetchAPI';
import { displayToast } from '../util/Toast';

function Graph () {
  const [profit, setProfit] = React.useState([])
  const data = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
      '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [{
      data: profit,
      borderWidth: 1,
      borderColor: '#F87171',
    }]
  };
  console.log(profit);

  React.useEffect(() => {
    const fetchBookings = async () => {
      const response = await FetchAPI('/bookings', 'GET', '', JSON.parse(localStorage.getItem('token')));
      switch (response.status) {
        case 400:
          displayToast('Could not open listing to edit', 'error')
          break;
        case 200: {
          const bookings = response.data.bookings
          // let price = 0
          const month = new Array(32).fill(0)
          for (const item of bookings) { // get bookings of current listing id
            if (item.owner === JSON.parse(localStorage.getItem('email'))) {
              const numDays = calculateDayDiff(item.dateRange.start, item.dateRange.end)
              // console.log(numDays);
              let i = 0
              console.log(item);
              const currDate = new Date(item.dateRange.start)
              while (i < numDays) {
                // console.log(currDate);
                // console.log(new Date());
                const daysAgo = calculateDayDiff(currDate, '')
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
    <div className="w-full sm:w-1/2 lg:w-3/4 h-96 flex flex-col items-center m-auto mt-5 text-xl mb-10">
      <h2 className="text-gray-700 font-medium">Profit from Last Month</h2>
      <Line
        data={data}
        options={ {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },

          },
          scales: {
            y: {
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
        }}
      />
    </div>

  )
}

export default Graph
