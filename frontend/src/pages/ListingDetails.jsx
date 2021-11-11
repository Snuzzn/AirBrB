import React from 'react';
import Fade from 'react-reveal/Fade';
import lakehouse from '../images/lakehouse.jpg';
import Amenities from '../components/ListingDetails/Amenities';
import Summary from '../components/ListingDetails/Summary';
import Header from '../components/ListingDetails/Header';
import ActionCard from '../components/ListingDetails/ActionCard';
import Bedrooms from '../components/ListingDetails/Bedrooms';
import Reviews from '../components/ListingDetails/Reviews';

const ListingDetails = () => {
  return (
    <Fade>
      <div className="flex flex-col w-full max-w-6xl gap-3">
        <Header/>
        <img className="rounded-3xl" src={lakehouse} alt="" />
        <div className="flex justify-between">
          <div>
            <Summary/>
            <hr className="mt-2 mb-4"/>
            <Amenities/>
          </div>
          <ActionCard/>
        </div>
        <hr className="mt-2 mb-3"/>
        <p className="text-xl font-medium text-gray-700">Bedrooms</p>
        <Bedrooms/>
        <hr className="mt-2 mb-3 "/>
        <p className="text-xl font-medium text-gray-700 mb-1">Reviews</p>
        <Reviews/>
      </div>
    </Fade>
  )
}

export default ListingDetails;
