import React from 'react'
import lakehouse from '../../images/lakehouse.jpg';
import { FiFilter, FiSearch } from 'react-icons/fi'
import { Popover } from '@headlessui/react'
import DayPicker from '../DayPicker';
import RangeInputs from './RangeInputs';
import { FetchAPI } from '../../util/FetchAPI';
import { displayToast } from '../../util/Toast';
import { StoreContext } from '../../util/store';

function HeroSearch () {
  const [priceRange, setPriceRange] = React.useState(['', ''])
  const [roomRange, setRoomRange] = React.useState(['', ''])
  const [sortRating, setSortRating] = React.useState('')

  const [location, setLocation] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

  const context = React.useContext(StoreContext)
  const setDayDuration = context.dayDuration[1]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    form.checkValidity()

    if (priceRange[0] > priceRange[1]) {
      displayToast('Minimum price must be lower than maximum price', 'error')
      return
    }

    if (roomRange[0] > roomRange[1]) {
      displayToast('Minimum bedrooms must be lower than maximum bedrooms', 'error')
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      displayToast('Check in date must come before the Check out date', 'error')
      return
    }
    const response = await FetchAPI('/listings', 'GET');
    switch (response.status) {
      case 400:
        displayToast('Could not find any listng', 'error')
        break;
      case 200:
        filterListings(response.data.listings)
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  const filterListings = async (listings) => {
    const matchingListings = []
    listings.forEach(async item => {
      // console.log(sortRating);
      // check location match
      if (!item.title.toLowerCase().includes(location.toLowerCase()) &&
      !item.address.city.toLowerCase().includes(location.toLowerCase())) return

      // check for price match
      if (priceRange[0] !== '' && priceRange[1] !== '') {
        if (item.price < parseInt(priceRange[0]) || item.price > parseInt(priceRange[1])) return;
      }

      // calculate day duration that user is looking for
      if (startDate !== '' && endDate !== '') {
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const time = endDateObj.getTime() - startDateObj.getTime()
        const days = Math.ceil(time / (1000 * 3600 * 24))
        if (days === 0) {
          displayToast('You can\'t check in and check out on the same day', 'error')
          return
        } else setDayDuration(days)
      } else {
        setDayDuration(0)
      }
      // need more info to check for date and bedroom matches, so we fetch this
      const response = await FetchAPI(`/listings/${item.id}`, 'GET');
      switch (response.status) {
        case 400:
          displayToast(`Could not find availability of listng ${item.id} `, 'error')
          break;
        case 200: {
          const listing = response.data.listing

          // check for bedroom match
          if (roomRange[0] !== '' && roomRange[1] !== '') {
            let numBedrooms = 0
            listing.metadata.bedrooms.forEach(item => {
              numBedrooms += parseInt(item.count)
            })
            if (numBedrooms < roomRange[0] || numBedrooms > roomRange[1]) return
          }
          // check for date availability match
          if (startDate !== '' && endDate !== '') {
            if (!doesAvailabilityMatch(listing.availability)) return
          }
          break;
        }
        default:
          displayToast('Something went wrong!', 'error');
      }
      matchingListings.push(item)

      // calculate rating for each listing
      matchingListings.forEach(listing => {
        let sum = 0
        listing.reviews.forEach(review => {
          if (review.score) sum += parseInt(review.score)
        })
        let rating = 0
        if (listing.reviews.length !== 0) rating = sum / listing.reviews.length
        matchingListings.rating = rating
      })
    });

    console.log(matchingListings);
    return matchingListings
  }

  const doesAvailabilityMatch = (availability) => {
    let isMatch = false;
    availability.forEach((range) => {
      if (new Date(range.start) <= new Date(startDate) && new Date(range.end) >= new Date(endDate)) {
        isMatch = true;
      }
    })
    return isMatch;
  }

  return (
    <div className="relative">
      <img src={lakehouse} className="w-screen h-70v lg:h-80v object-cover rounded-lg sm:rounded-3xl"
        alt="empty street with park benches represents lack of listings" />

      <div className="flex items-center justify-center lg:items-end sm:pb-10 absolute top-0 left-0 w-full h-full ">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7 lg:flex-row p-4 sm:gap-3  bg-white rounded-lg shadow-xl text-lg">
            <div>
              <p>Location</p>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                className="focus:outline-none" placeholder="Where are you going?" />
            </div>
            <div>
              <p>Check in</p>
              <DayPicker setDate={setStartDate}/>
            </div>
            <div>
              <p>Check out</p>
              <DayPicker setDate={setEndDate}/>
            </div>
            <div className="flex gap-4">
              <Popover className="relative">
                <Popover.Button className="bg-gray-200 p-5 rounded-lg hover:bg-gray-300">
                  <FiFilter className="text-gray-700"/>
                </Popover.Button>
                <Popover.Panel className="absolute flex flex-col gap-5 p-6 bottom-12 mb-8 sm:right-0 rounded-lg bg-white shadow-xl animate-fadeUp">
                  <div>
                    <p className="text-xl font-bold mb-2">Filters</p>
                    <hr />
                  </div>
                  <div>
                    <label >Price</label>
                    <RangeInputs initMax={5000} setRange={setPriceRange} range={priceRange}/>
                  </div>
                  <div>
                    <p className="mb-1">Bedrooms</p>
                    <RangeInputs initMax={50} setRange={setRoomRange} range={roomRange}/>
                  </div>
                  <div >
                    <p className="mb-2" >Rating</p>
                    <select value={sortRating} onChange={e => setSortRating(e.target.value)} className="p-2 border-gray-200 border-2 rounded-md " >
                      <option value="">Unsorted</option>
                      <option value="descending">Sort by: Highest to Lowest</option>
                      <option value="ascending">Sort by: Lowest to Highest</option>
                    </select>
                  </div>
                </Popover.Panel>
              </Popover>
              <button className="bg-red-400 p-3 text-white rounded-lg hover:bg-red-400 flex items-center gap-2">
                <FiSearch />
                <p>Search</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HeroSearch
