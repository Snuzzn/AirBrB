import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

function ListingTitle () {
  const navigate = useNavigate();

  return (
    <p className="flex items-center text-sm text-gray-500">
      <button onClick={() => navigate(-1)} className="hover:underline">Listings</button>
      <IoChevronForwardOutline className="inline m-0"/>
      Details
      </p>
  )
}

export default ListingTitle
