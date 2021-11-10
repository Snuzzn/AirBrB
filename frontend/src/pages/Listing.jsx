import React from 'react';
import Fade from 'react-reveal/Fade';
import { HiStar } from 'react-icons/hi'
import lakehouse from '../images/lakehouse.jpg';

const Listing = () => {
  return (
    <Fade>
      <div className="flex flex-col w-full max-w-6xl gap-5">
        <div className="flex items-center  text-gray-700 justify-between">
          <div>
            <p className="text-3xl">Wayne Manor</p>
            <p className="text-gray-500">1007 Mountain Drive
              <span className="text-gray-500"> · Gotham</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 ">
              <HiStar className="text-red-400"/>
              <p className="text-gray-600 text-2xl">4.96</p>
            </div>
            <p className="text-sm text-gray-500">12 reviews</p>
          </div>

        </div>
        <img className="rounded-3xl" src={lakehouse} alt="" />
      </div>
    </Fade>
  )
}

export default Listing;
