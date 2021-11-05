import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import emptyStreet from '../images/emptyStreet.svg';

const Hostedlistings = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="text-3xl font-medium  text-gray-700">
          Your Listings
        </div>
        <button >
          <BsPlusCircle size="1.5em" alt="add button to create new listing" className='text-gray-700 hover:text-black hover:drop-shadow-lg' />
        </button>
      </div>
      <img src={emptyStreet} alt="empty street with park benches represents lack of listings" className="mt-20 w-8/12 max-w-lg self-center" />
      <div className="text-lg font-extralight mt-5 self-center">You have no listings yet...</div>
    </>
  );
}

export default Hostedlistings;
