import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineShower, MdOutlineHome } from 'react-icons/md';
import PropTypes from 'prop-types';

function BasicInfo ({ formData, setFormData }) {
  const updateFormData = (e) => {
    const key = e.target.name
    const clone = JSON.parse(JSON.stringify(formData))
    if (key === 'title' || key === 'price') clone[key] = e.target.value
    else if (key === 'propertyType' || key === 'bathrooms') clone.metadata[key] = e.target.value
    else if (key === 'street' || key === 'city') clone.address[key] = e.target.value
    setFormData(clone)
  }

  return (
    <>
      {/* Title */}
      <div className="flex flex-col gap-1 justify-center">
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={updateFormData}
          required className="p-2 border border-gray-300 rounded-lg" />
      </div>
      {/* Address */}
      <div className="flex flex-col gap-1 justify-center">
        <label>Address</label>
        <input type="text" name="street" value={formData.address.street} onChange={updateFormData}
          required className="p-2 border border-gray-300 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <label>City</label>
        <input type="text" name="city" value={formData.address.city} onChange={updateFormData}
          required className="p-2 border border-gray-300 rounded-lg" />
      </div>
      {/* Property type, price, bathrooms */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Property Type</label>
          <span className="absolute mt-7 ml-2"><MdOutlineHome className="text-gray-400"/></span>
          <select name="propertyType" value={formData.metadata.type} onChange={updateFormData} required
            className="p-2 pl-7 border bg-white border-gray-300 rounded-lg" >
            <option value="Entire Place">Entire Place</option>
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
          </select>
        </div>
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Price (per night)</label>
          <span className="absolute mt-7 ml-2"><BsCurrencyDollar className="text-gray-400"/></span>
          <input type="number" required name="price" value={formData.price} onChange={updateFormData}
            className="p-2 pl-7 border border-gray-300 rounded-lg" />
        </div>
        <div className="relative flex flex-col gap-1 justify-center">
          <label>Bathrooms</label>
          <span className="absolute mt-7 ml-2"><MdOutlineShower className="text-gray-400"/></span>
          <input type="number" required name="bathrooms"
            value={formData.metadata.bathrooms} onChange={updateFormData}
            className="p-2 pl-7 border border-gray-300 rounded-lg" />
        </div>
      </div>
    </>
  )
}

export default BasicInfo

BasicInfo.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
}
