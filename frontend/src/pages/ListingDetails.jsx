import React from 'react';
import Fade from 'react-reveal/Fade';
import lakehouse from '../images/lakehouse.jpg';
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
    console.log(response);
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
  console.log(listingInfo);

  return (
    <Fade>
      <div className="flex flex-col w-full max-w-6xl gap-3">
        <Header/>
        <img className="rounded-3xl" src={lakehouse} alt="" />
        <div className="flex flex-col gap-9 justify-between lg:flex-row lg:gap-0">
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
        <p className="text-xl font-medium text-gray-700 mb-3">Reviews</p>
        <Reviews/>
        <hr />
      </div>
    </Fade>
  )
}

export default ListingDetails;
