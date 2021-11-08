import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineShower, MdOutlineHome } from 'react-icons/md';

function BasicInfo () {
  return (
    <>
      {/* Title */}
      <div className="flex flex-col gap-1 justify-center">
        <label>Title</label>
        <input type="text" name="title" required className="p-2 border border-gray-300 rounded-lg" />
      </div>
      {/* Address */}
      <div className="flex flex-col gap-1 justify-center">
        <label>Address</label>
        <input type="text" name="address" required className="p-2 border border-gray-300 rounded-lg" />
      </div>
      {/* Property type, price, bathrooms */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Property Type</label>
          <span className="absolute mt-7 ml-2"><MdOutlineHome className="text-gray-400"/></span>
          <select name="propertyType" required className="p-2 pl-7 border bg-white border-gray-300 rounded-lg" >
            <option value="Entire Place">Entire Place</option>
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
          </select>
        </div>
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Price (per night)</label>
          <span className="absolute mt-7 ml-2"><BsCurrencyDollar className="text-gray-400"/></span>
          <input type="number" required name="price" className="p-2 pl-7 border border-gray-300 rounded-lg" />
        </div>
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Bathrooms</label>
          <span className="absolute mt-7 ml-2"><MdOutlineShower className="text-gray-400"/></span>
          <input type="number" required name="bathrooms" className="p-2 pl-7 border border-gray-300 rounded-lg" />
        </div>
      </div>
    </>
  )
}

export default BasicInfo
