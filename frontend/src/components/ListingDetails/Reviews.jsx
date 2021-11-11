import React from 'react'
import { HiStar, HiUserCircle } from 'react-icons/hi'

function Reviews () {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex gap-5 items-center">
        <div className="w-10 self-start">
          <HiUserCircle size="3em" className="text-gray-600 " />
        </div>
        <div>
          <div className="flex gap-1">
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-gray-400 text-xl"/>
            <HiStar className="text-gray-400 text-xl"/>
          </div>
          <p className="text-gray-600 max-w-5xl">This place was pretty cool. Not enough bats though. This place was pr though. This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.This place was pretty cool. Not enough bats though. This place was pr though.</p>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="w-10 self-start">
          <HiUserCircle size="3em" className="text-gray-600 self-start" />
        </div>
        <div>
          <div className="flex gap-1">
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-red-400 text-xl"/>
            <HiStar className="text-gray-400 text-xl"/>
            <HiStar className="text-gray-400 text-xl"/>
          </div>
          <p className="text-gray-600 ">This place was pretty cool. Not enough bats though. </p>
        </div>
      </div>
    </div>
  )
}

export default Reviews
