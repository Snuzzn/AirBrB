import React from 'react'
import lakehouse from '../../images/lakehouse.jpg';
import { FiFilter, FiSearch } from 'react-icons/fi'
import { Popover } from '@headlessui/react'
import DayPicker from '../DayPicker';
import RangeInputs from './RangeInputs';
import { FetchAPI } from '../../util/FetchAPI';
import { displayToast } from '../../util/Toast';

function HeroSearch () {
  const [priceRange, setPriceRange] = React.useState([])
  const [roomRange, setRoomRange] = React.useState([])
  console.log(priceRange);
  console.log(roomRange);

  const [sortRating, setSortRating] = React.useState('descending')
  console.log(sortRating);

  const [location, setLocation] = React.useState('')
  console.log(location);
  const [startDate, setStartDate] = React.useState('')
  console.log(startDate);
  const [endDate, setEndDate] = React.useState('')
  console.log(endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    form.checkValidity()
    console.log(e.target);
    const response = await FetchAPI('/listings', 'GET');
    switch (response.status) {
      case 400:
        displayToast('Could not find any listng', 'error')
        break;
      case 200:
        displayToast('Found some listings', 'success')
        console.log(response);
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  return (
    <div className="relative">
      <img src={lakehouse} className="w-screen h-70v lg:h-80v object-cover rounded-lg sm:rounded-3xl"
        alt="empty street with park benches represents lack of listings" />

      <div className="flex items-center justify-center lg:items-end sm:pb-10 absolute top-0 left-0 w-full h-full ">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7 lg:flex-row p-4 sm:gap-3  bg-white rounded-lg shadow-xl">
            <div>
              <p>Location</p>
              <input type="text" required value={location} onChange={e => setLocation(e.target.value)}
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
            <div className="flex gap-3">
              <Popover className="relative">
                <Popover.Button className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
                  <FiFilter className="text-gray-700"/>
                </Popover.Button>
                <Popover.Panel className="absolute flex flex-col gap-5 p-6 bottom-12 mb-6 sm:right-0 rounded-lg bg-white shadow-xl animate-fadeUp">
                  <div>
                    <p className="text-xl font-bold mb-2">Filters</p>
                    <hr />
                  </div>
                  <div>
                    <label >Price</label>
                    <RangeInputs initMax={5000} setRange={setPriceRange} />
                  </div>
                  <div>
                    <p className="mb-1">Bedrooms</p>
                    <RangeInputs initMax={50} setRange={setRoomRange} />
                  </div>
                  <div >
                    <p className="mb-2" >Rating</p>
                    <select value={sortRating} onChange={e => setSortRating(e.target.value)} className="p-2 border-gray-200 border-2 rounded-md " >
                      <option value="descending">Sort by: Highest to Lowest</option>
                      <option value="ascending">Sort by: Lowest to Highest</option>
                    </select>
                  </div>
                </Popover.Panel>
              </Popover>
              <button className="bg-red-300 p-4 rounded-lg hover:bg-red-400">
                <FiSearch className="text-gray-700"/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HeroSearch
