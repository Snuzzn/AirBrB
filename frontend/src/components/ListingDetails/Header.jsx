import React from 'react'
import { HiStar } from 'react-icons/hi'

function Header () {
  return (
    <div className="flex items-center  text-gray-700 justify-between">
      <div>
        <p className="text-3xl font-medium">Wayne Manor</p>
        <p className="text-gray-500">1007 Mountain Drive
          <span className="text-gray-500"> · Gotham</span>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 ">
          <HiStar className="text-red-400 text-xl"/>
          <p className="text-gray-600 font-medium text-2xl">4.96</p>
        </div>
        <p className="text-sm text-gray-500 hover:text-red-400 cursor-pointer">12 reviews</p>
      </div>
    </div>
  )
}

export default Header
