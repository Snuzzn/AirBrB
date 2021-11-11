import React from 'react'
import { MdOutlineDoorBack, MdOutlineShower, MdOutlineBed } from 'react-icons/md'

function Summary () {
  return (
    <div className="mt-2 flex items-center gap-3 text-2xl font-medium text-gray-800">
      <p>
        <span>Entire Place</span>
        <span> · </span>
      </p>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg" >3</p>
        <MdOutlineDoorBack/>
      </div>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg">7</p>
        <MdOutlineBed/>
      </div>
      <div className="flex items-center gap-1 text-xl text-gray-600">
        <p className="text-lg">2</p>
        <MdOutlineShower/>
      </div>
    </div>
  )
}

export default Summary
