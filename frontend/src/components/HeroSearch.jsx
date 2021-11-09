import React from 'react'
import lakehouse from '../images/lakehouse.jpg';
import { FiFilter, FiSearch } from 'react-icons/fi'
import { Popover } from '@headlessui/react'
import DayPicker from '../components/DayPicker';

function HeroSearch () {
  const [priceRange, setPriceRange] = React.useState({ min: 2, max: 10 })
  const [roomRange, setRoomRange] = React.useState([1, 5])
  console.log(roomRange);
  console.log(priceRange);
  console.log(setRoomRange);
  return (
    <div className="relative">
    <img src={lakehouse} alt="empty street with park benches represents lack of listings" className="w-11/12 rounded-3xl self-center m-auto" />
    <div className="flex items-center justify-center">
      <div className="absolute bottom-10 p-4 flex gap-3  bg-white rounded-lg shadow-xl">
        <div>
          <p>Location</p>
          <input type="text" className="focus:outline-none" placeholder="Where are you going?" />
        </div>
        <div>
          <p>Check in</p>
          <DayPicker/>
        </div>
        <div>
          <p>Check out</p>
          <DayPicker/>
        </div>
        <Popover className="relative">
          <Popover.Button className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
            <FiFilter className="text-gray-700"/>
          </Popover.Button>
          <Popover.Panel className="absolute flex flex-col gap-5 z-10 p-6 bottom-12 mb-6 right-0 rounded-lg bg-white shadow-xl animate-fadeUp">
            <div>
              <p className="text-xl font-bold mb-2">Filters</p>
              <hr />
            </div>
            <div>
              <label >Price</label>
              <div className="mt-1 flex gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Min</label>
                  <input type="text" placeholder="0" className="w-24 p-1 border border-gray-300 rounded" value={priceRange[0]} onChange={e => setPriceRange(e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Max</label>
                  <input type="text" placeholder="1500" className="w-24 p-1 border border-gray-300 rounded" value={priceRange[0]} onChange={e => setPriceRange(e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1" >Bedrooms</p>
              <div className="mt-1 flex gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Min</label>
                  <input type="text" placeholder="0" className="w-24 p-1 border border-gray-300 rounded" value={priceRange[0]} onChange={e => setPriceRange(e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Max</label>
                  <input type="text" placeholder="1500" className="w-24 p-1 border border-gray-300 rounded" value={priceRange[0]} onChange={e => setPriceRange(e.target.value)} />
                </div>
              </div>
            </div>
            <div >
              <p className="mb-2" >Rating</p>
              <select className="p-2 border-gray-200 border-2 rounded-md " >
                <option value="hello">Sort by: Highest to Lowest</option>
                <option value="hello">Sort by: Lowest to Highest</option>
              </select>
            </div>
          </Popover.Panel>
        </Popover>
        <button className="bg-red-300 p-4 rounded-lg hover:bg-red-400">
          <FiSearch className="text-gray-700"/>
        </button>
      </div>
    </div>
  </div>
  )
}

export default HeroSearch
