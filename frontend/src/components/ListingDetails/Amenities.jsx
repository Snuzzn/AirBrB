import React from 'react'
import { GiBatMask, GiKitchenTap } from 'react-icons/gi'
import { ImFire } from 'react-icons/im'
import { IoTvOutline } from 'react-icons/io5'
import { FaRegSnowflake } from 'react-icons/fa'
import { MdWifi, MdOutlineLocalLaundryService } from 'react-icons/md'
import { AiOutlineCar } from 'react-icons/ai'
import { BiWater } from 'react-icons/bi'
import PropTypes from 'prop-types';

function Amenities ({ listingInfo }) {
  console.log(amenityInfo);
  console.log(listingInfo);
  return (
    <div className="flex flex-col gap-8">
      {listingInfo.metadata.amenities.filter((amenity) => amenity.isChecked).map((amenity) => (
        <div className="flex gap-5" key={amenity.text}>
          {amenityInfo[amenity.text].icon}
          <div className="">
            <p className="font-semibold text-lg text-gray-700">{amenity.text}</p>
            <p className="text-gray-500">{amenityInfo[amenity.text].msg}</p>
          </div>
        </div>)
      )}
    </div>
  )
}

export default Amenities

Amenities.propTypes = {
  listingInfo: PropTypes.object,
}

const amenityInfo = {
  Kitchen: {
    icon: <GiKitchenTap className="text-2xl text-gray-600 self-center"/>,
    msg: 'Sink your teeth into a delicious home-made meal. Cooking skills not included.'
  },
  Washer: {
    icon: <MdOutlineLocalLaundryService className="text-2xl text-gray-600 self-center"/>,
    msg: 'Does something smell funky? Dunk your clothes in the on-site washing machine.'
  },
  'Air Conditioning': {
    icon: <FaRegSnowflake className="text-2xl text-gray-600 self-center"/>,
    msg: 'Get all cooly wooly with AirBrB-approved air conditioning.'
  },
  Heating: {
    icon: <ImFire className="text-2xl text-gray-600 self-center" />,
    msg: 'Get all snuggly wuggly with AirBrB-approved heating.',
  },
  TV: {
    icon: <IoTvOutline className="text-2xl text-gray-600 self-center" />,
    msg: 'Binge shows. Watch the news. You know, holiday stuff.'
  },
  'Free Parking': {
    icon: <AiOutlineCar className="text-2xl text-gray-600 self-center" />,
    msg: 'Drop anchor right next to the stay. Easy in. Easy out.',
  },
  'Free Wifi': {
    icon: <MdWifi className="text-2xl text-gray-600 self-center" />,
    msg: 'Instant communication. The world at your fingertips. Blah, blah. You know the deal.'
  },
  Waterfront: {
    icon: <BiWater className="text-2xl text-gray-600 self-center" />,
    msg: 'Enjoy an amazing view of the most abundant substance on Earth: water. Yes seriously. Water.'
  },
  'Bat Cave': {
    icon: <GiBatMask className="text-2xl text-gray-600 self-center" />,
    msg: 'You\'re very own Bat Cave! Perfect for hunting crime or just chilling with the bats.'
  },
}

// const amenityList = [{ text: 'Kitchen', isChecked: false },
//   { text: 'Washer', isChecked: false },
//   { text: 'Air Conditioning', isChecked: false },
//   { text: 'Heating', isChecked: false },
//   { text: 'TV', isChecked: false },
//   { text: 'Free Parking', isChecked: false },
//   { text: 'Free Wifi', isChecked: false },
//   { text: 'Waterfront', isChecked: false },
//   { text: 'Bat Cave', isChecked: false }]
