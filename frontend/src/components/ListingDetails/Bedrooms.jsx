import React from 'react'
import { IoBedOutline } from 'react-icons/io5'

function Bedrooms () {
  return (
    <div className="flex gap-4">
      <div className="h-40 w-60 border p-4 rounded-xl flex flex-col justify-evenly">
        <IoBedOutline className="text-5xl text-gray-600"/>
        <div>
          <p className="text-lg text-gray-700 ">Bedroom 1</p>
          <p className="text-gray-600 font-light">2 beds</p>
        </div>
      </div>
      <div className="h-40 w-60 border p-4 rounded-xl flex flex-col justify-evenly">
        <IoBedOutline className="text-5xl text-gray-600"/>
        <div>
          <p className="text-lg text-gray-700 ">Bedroom 2</p>
          <p className="text-gray-600 font-light">3 beds</p>
        </div>
      </div>
    </div>
  )
}

export default Bedrooms
