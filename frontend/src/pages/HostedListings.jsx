import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FetchAPI } from '../util/FetchAPI';
import HostListing from '../components/HostListing';
import EmptyList from '../components/EmptyList';

const Hostedlistings = () => {
  const [hostListings, setHostListings] = React.useState([]);

  React.useEffect(async () => {
    console.log('fetching');
    const response = await FetchAPI('/listings', 'GET');
    if (response.status === 200) {
      // Filter out listings not belong to host
      const myListings = response.data.listings.filter((listing) => listing.owner === JSON.parse(localStorage.getItem('email')));
      setHostListings([...myListings]);
    }
  }, []);

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
      <div className="flex flex-col justify-center items-center">
        {hostListings.length === 0 ? <EmptyList /> : hostListings.map((listing, idx) => <HostListing key={idx} listing={listing} />)
        }
      </div>
    </>
  );
}

export default Hostedlistings;
