import React from 'react';
import Fade from 'react-reveal/Fade';
import { IoChevronBack } from 'react-icons/io5';
import { BsCurrencyDollar, BsWater, BsPlusCircle } from 'react-icons/bs';
import { MdOutlineShower, MdOutlineHome, MdOutlineLocalParking } from 'react-icons/md';
import { GiKitchenTap, GiBatMask, GiWashingMachine } from 'react-icons/gi'
import { FaRegSnowflake, FaTv } from 'react-icons/fa'
import { AiOutlineWifi } from 'react-icons/ai'
import { ImFire } from 'react-icons/im'
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

const CreateListing = () => {
  const amenities = [{ text: 'Kitchen', icon: <GiKitchenTap/> },
    { text: 'Washer', icon: <GiWashingMachine/> },
    { text: 'Air Conditioning', icon: <FaRegSnowflake/> },
    { text: 'Heating', icon: <ImFire/> },
    { text: 'TV', icon: <FaTv/> },
    { text: 'Free Parking', icon: <MdOutlineLocalParking/> },
    { text: 'Free Wifi', icon: <AiOutlineWifi/> },
    { text: 'Waterfront', icon: <BsWater/> },
    { text: 'Bat Cave', icon: <GiBatMask/> }]

  const [numBedrooms, setNumBedrooms] = React.useState(0)
  // console.log(...Array(numBedrooms).keys());

  return (
    <Fade>
      <div className="flex flex-col w-full 2xl:w-1/2 max-w-2xl ">
      <div className="flex items-center gap-2">
        <Link to="/hosted-listings">
          <IoChevronBack/>
        </Link>
        <div className="text-3xl font-medium  text-gray-700">
          New Listing
        </div>
      </div>
      <form action="" className="flex flex-col pt-7 gap-5">
        <div className="flex flex-col gap-1 justify-center">
          <label>Title</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label>Address</label>
          <input type="text" className="p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Property Type</label>
            <span className="absolute mt-7 ml-2"><MdOutlineHome className="text-gray-400"/></span>
            <select className="p-2 pl-7 border bg-white border-gray-300 rounded-lg" name="propertyType" id="propertyType">
              <option value="entire">Entire Place</option>
              <option value="private">Private Room</option>
              <option value="shared">Shared Room</option>
            </select>
          </div>
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Price (per night)</label>
            <span className="absolute mt-7 ml-2"><BsCurrencyDollar className="text-gray-400"/></span>
            <input type="number" className="p-2 pl-7 border border-gray-300 rounded-lg" />
          </div>
          <div className="relative flex flex-col gap-1 justify-center">
            <label>Bathrooms</label>
            <span className="absolute mt-7 ml-2"><MdOutlineShower className="text-gray-400"/></span>
            <input type="number" className="p-2 pl-7 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-3 mb-2">
            <label>Bedrooms</label>
            <BsPlusCircle onClick={() => { setNumBedrooms(numBedrooms + 1) }} className=" text-red-400 cursor-pointer hover:text-red-500" />
          </div>
          { [...Array(numBedrooms).keys()].map((index) => (
            <div key={index} className="flex gap-5 items-center ">
              <div className="flex flex-col gap-1 justify-center">
                <label className="text-sm text-gray-600">Name</label>
                <input type="text" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <label className="text-sm text-gray-600">No. of beds</label>
                <input type="number" className="p-2 border border-gray-300 rounded-lg w-24" />
              </div>
            </div>))}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label>Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <IconContext.Provider value={{ color: '#8f8f9c' }}>
              {amenities.map((item) => (
              <div key={item.text} className="flex gap-4 items-center">
                <input type="checkbox" className="cursor-pointer" id={item.text} />
                <div className="flex gap-2 items-center">
                  <label htmlFor={item.text} className="text-gray-500 cursor-pointer">{item.text}</label>
                  {item.icon}
                </div>
              </div>))}

            </IconContext.Provider>

          </div>

        </div>
      </form>
      </div>

    </Fade>
  );
}

export default CreateListing;
