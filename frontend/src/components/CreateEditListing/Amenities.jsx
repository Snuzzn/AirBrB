import React from 'react'
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

function Amenities ({ amenities, setAmenities }) {
  const changeAmenities = (index) => {
    const copy = [...amenities]
    copy[index].isChecked = !copy[index].isChecked;
    setAmenities(copy)
  }
  return (
    <div className="flex flex-col gap-1 justify-center">
      <label>Amenities</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <IconContext.Provider value={{ color: '#8f8f9c' }}>
          {amenities.map((item, index) => (
          <div key={item.text} className="flex gap-4 items-center">
            <input type="checkbox" checked={amenities[index].isChecked}
              onChange={(e) => changeAmenities(index)} aria-label="select amenity"
              name="amenities" value={item.text} className="cursor-pointer" id={item.text} />
            <label htmlFor={item.text} className="text-gray-500 cursor-pointer">{item.text}</label>
          </div>))}
        </IconContext.Provider>
      </div>
    </div>
  )
}

export default Amenities

Amenities.propTypes = {
  amenities: PropTypes.object,
  setAmenities: PropTypes.func,
}
