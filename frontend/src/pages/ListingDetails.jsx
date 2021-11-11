import React from 'react';
import Fade from 'react-reveal/Fade';
import Amenities from '../components/ListingDetails/Amenities';
import Summary from '../components/ListingDetails/Summary';
import Header from '../components/ListingDetails/Header';
import ActionCard from '../components/ListingDetails/ActionCard';
import Bedrooms from '../components/ListingDetails/Bedrooms';
import Reviews from '../components/ListingDetails/Reviews';
import { displayToast } from '../util/Toast';
import { FetchAPI } from '../util/FetchAPI';
import { useNavigate, useParams } from 'react-router';

const ListingDetails = () => {
  const [listingInfo, setListingInfo] = React.useState([])
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(async () => {
    const response = await FetchAPI(`/listings/${id}`, 'GET', '', '');
    switch (response.status) {
      case 400:
        displayToast('Could not open listing', 'error')
        break;
      case 200: {
        const listing = response.data.listing
        if (JSON.stringify(listing) === '{}') {
          displayToast('Could not find listing', 'error')
          navigate('/listings')
          return;
        }
        setListingInfo(listing)
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [])

  return (
    <>
    {Object.keys(listingInfo).length !== 0 &&
      <Fade>
        <div className="flex flex-col w-full max-w-6xl gap-3">
          <Header listingInfo={listingInfo}/>
          <img className="rounded-3xl" src={listingInfo.thumbnail} alt="" />
          <div className="flex flex-col gap-9 justify-between lg:flex-row lg:gap-0">
            <div>
              <Summary listingInfo={listingInfo}/>
              <hr className="mt-2 mb-4"/>
              <Amenities listingInfo={listingInfo}/>
            </div>
            <ActionCard listingInfo={listingInfo}/>
          </div>
          <hr className="mt-2 mb-3"/>
          <p className="text-xl font-medium text-gray-700">Bedrooms</p>
          <Bedrooms listingInfo={listingInfo}/>
          <hr className="mt-2 mb-3 "/>
          <p className="text-xl font-medium text-gray-700 mb-3">Reviews</p>
          <Reviews listingInfo={listingInfo}/>
          <hr />
        </div>
      </Fade>
    }
    </>
  )
}

export default ListingDetails;
