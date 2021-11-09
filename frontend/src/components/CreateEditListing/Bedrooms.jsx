import React from 'react'
import PropTypes from 'prop-types';
import { BsPlusCircle } from 'react-icons/bs';

function Bedrooms ({ bedrooms, setBedrooms }) {
  const handleBedroomChange = (e, index, isTitle) => {
    const input = e.target.value
    const old = [...bedrooms]
    if (isTitle) old[index].title = input
    else old[index].count = input
    setBedrooms(old)
  }

  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex items-center gap-3 mb-2">
        <label>Bedrooms</label>
        <BsPlusCircle onClick={() => setBedrooms([...bedrooms, { title: '', count: 0 }])} className=" text-red-400 cursor-pointer hover:text-red-500" />
      </div>
      {bedrooms.map((item, index) => (
        <div key={index} className="flex gap-5 items-center ">
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-sm text-gray-600">Name</label>
            <input type="text" value={bedrooms[index].title} onChange={(e) => handleBedroomChange(e, index, true)} required className="p-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-sm text-gray-600">No. of beds</label>
            <input type="number" value={bedrooms[index].count} onChange={(e) => handleBedroomChange(e, index, false)} required className="p-2 border border-gray-300 rounded-lg w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bedrooms

Bedrooms.propTypes = {
  bedrooms: PropTypes.string,
  setBedrooms: PropTypes.string
}
