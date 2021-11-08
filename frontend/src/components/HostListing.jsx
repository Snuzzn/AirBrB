import React from 'react';
import PropTypes from 'prop-types';
import { BsDot } from 'react-icons/bs';
import { BiBath, BiPencil, BiTrash } from 'react-icons/bi';
import { RiHotelBedLine } from 'react-icons/ri';
import { FetchAPI } from '../util/FetchAPI';
import { useNavigate } from 'react-router-dom';
import { displayToast } from '../util/Toast';

const HostListing = ({ listing, setRefresh, refresh }) => {
  const [metadata, setMetadata] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getData () {
      const response = await FetchAPI(`/listings/${listing.id}`, 'GET');
      switch (response.status) {
        case 200:
          setMetadata(response.data.listing.metadata);
          break;
        case 403:
          displayToast('You are not authorised to access this listing', 'error');
          break;
        default:
          displayToast('Something went wrong!', 'error');
      }
    }

    getData();
  }, []);

  const listingId = listing.id;
  const scores = listing.reviews.filter((review) => review.score);

  const getScore = () => {
    if (scores.length === 0) {
      return 'N/A';
    }
    return scores.reduce((a, b) => parseInt(a) + parseInt(b)) / scores.length;
  }

  const getNumReviews = () => {
    return scores.length;
  }

  const editListing = (e) => {
    navigate(`/edit-listing/${listingId}`);
  }

  const deleteListing = async (e) => {
    const response = await FetchAPI(`/listings/${listingId}`, 'DELETE', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not delete listing', 'error')
        break;
      case 200:
        displayToast('Successfully deleted listing', 'success')
        setRefresh(!refresh);
        break;
      case 403:
        displayToast('You are not authorised to delete this listing', 'error');
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

  return (
    <>
    { metadata &&
      <div className="border max-w-4xl shadow-md p-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 text-gray-500 font-medium w-full">
      <div className="col-start-1 row-span-3 mx-auto">
        <img className="max-h-60 rounded-2xl" src={listing.thumbnail} alt="Image of a your listing" />
      </div>
      <div className="flex flex-col justify-between sm:col-start-2 row-span-3">
        <div>

          <div className="flex justify-between">
            <div>{metadata.type}</div>
            <div>
              <div onClick={editListing} className="inline cursor-pointer">
                <BiPencil className="inline text-xl mr-3 pointer-events-none" />
              </div>
              <div onClick={deleteListing} className="inline cursor-pointer">
                <BiTrash className="inline text-xl pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold text-black">{listing.title}</div>
          <div className="inline-flex items-center">
            <svg width="20" height="20" fill="orange" className="text-violet-600 inline">
              <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
            </svg>
            <div className="ml-2 mt-1">
              <span className="font-italic text-black">{getScore()}</span>
              <span className="pl-1 text-black">({getNumReviews()})</span>
              <BsDot className="inline pb-0.5" />
              <>{listing.address}</>
            </div>
          </div>
          <hr className="mt-2 mb-2 w-20 border-gray-300 block" />
          <div className="grid grid-cols-2">
            <div className="col-start-1 row-span-2">
                <RiHotelBedLine className="inline pb-0.5 text-xl" />
                <span className="text-base ml-2 font-normal">{metadata.bedrooms && metadata.bedrooms.map(bedroom => parseInt(bedroom.count)).reduce((a, b) => a + b)} x Beds</span>
            <div>
                <BiBath className="inline pb-0.5 text-xl" />
                <span className="text-base ml-2 font-normal">{metadata.bathrooms} x Baths</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-red-500 align-bottom text-right flex-end">
          ${listing.price}
        </div>
      </div>
    </div>
  }
  </>)
}

export default HostListing;

HostListing.propTypes = {
  listing: PropTypes.object,
  setRefresh: PropTypes.object,
  refresh: PropTypes.object
}
