import React from 'react'
import { GiBatMask } from 'react-icons/gi'
import { ImFire } from 'react-icons/im'
import { IoTvOutline } from 'react-icons/io5'
import { FaRegSnowflake } from 'react-icons/fa'
import { MdWifi, MdOutlineLocalLaundryService } from 'react-icons/md'
import { AiOutlineCar } from 'react-icons/ai'

function Amenities () {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-5">
        <GiBatMask className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Bat Cave</p>
          <p className="text-gray-500">You&apos;re very own Bat Cave! Perfect for hunting crime or just chilling with the bats.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <MdWifi className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Free Wifi</p>
          <p className="text-gray-500">Instant communication. The world at your fingertips. Blah, blah. You know the deal.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <ImFire className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Heating</p>
          <p className="text-gray-500">Get all snuggly wuggly with AirBrB-approved heating.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <FaRegSnowflake className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Air Conditioning</p>
          <p className="text-gray-500">Get all cooly wooly with AirBrB-approved air conditioning.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <MdOutlineLocalLaundryService className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Washing</p>
          <p className="text-gray-500">Does something smell funky? Dunk your clothes in the on-site washing machine.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <IoTvOutline className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">TV</p>
          <p className="text-gray-500">Binge shows. Watch the news. You know, holiday stuff.</p>
        </div>
      </div>
      <div className="flex gap-5">
        <AiOutlineCar className="text-2xl text-gray-600 self-center" />
        <div className="">
          <p className="font-semibold text-lg text-gray-700">Free Parking</p>
          <p className="text-gray-500">Drop anchor right next to the stay. Easy in. Easy out.</p>
        </div>
      </div>
    </div>
  )
}

export default Amenities
