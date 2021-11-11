import React from 'react';
import PropTypes from 'prop-types';
import { BsDot } from 'react-icons/bs';
import { BiBath, BiPencil, BiTrash } from 'react-icons/bi';
import { RiHotelBedLine } from 'react-icons/ri';
import { CgLivePhoto } from 'react-icons/cg';
import { FetchAPI } from '../util/FetchAPI';
import { useNavigate, Link } from 'react-router-dom';
import { displayToast } from '../util/Toast';
import AvailabilityModal from './AvailabilityModal';

const HostListing = ({ listing, setRefresh, refresh }) => {
  const [metadata, setMetadata] = React.useState({});
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = React.useState(false);
  const [published, setPublished] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getData () {
      const response = await FetchAPI(`/listings/${listing.id}`, 'GET');
      switch (response.status) {
        case 200:
          console.log(response);
          setMetadata(response.data.listing.metadata);
          setPublished(response.data.listing.published);
          break;
        case 403:
          displayToast('You are not authorised to access this listing', 'error');
          break;
        default:
          displayToast('Something went wrong!', 'error');
      }
    }

    getData();
  }, [published]);

  const listingId = listing.id;
  const scores = listing.reviews.filter((review) => review.score);

  const handlePublishClick = () => {
    setShowAvailabilityModal(true);
    setShowTooltip(false);
  }

  const handleUnpublishClick = async () => {
    setShowTooltip(false);

    const response = await FetchAPI(`/listings/unpublish/${listingId}`, 'PUT', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Input error.', 'error');
        break;
      case 403:
        displayToast('You are not authorised to unpublish this listing.', 'error')
        break;
      case 200:
        displayToast('Listing successfully unpublished!', 'success')
        setPublished(0);
        break;
      default:
        displayToast('Something went wrong!', 'error');
        break;
    }
  }

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
  const listingDetailsPage = `/listing/${listingId}`

  return (
    <>
    { metadata && published !== 0 &&
      <div className="border max-w-4xl shadow-md p-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 text-gray-500 font-medium w-full">
        <div className="col-start-1 row-span-3 mx-auto ">
          <Link to={listingDetailsPage} >
            <img className="object-cover h-60 w-80 rounded-2xl" src={listing.thumbnail} alt="Image of a your listing" />
          </Link>
        </div>

      <div className="flex flex-col justify-between sm:col-start-2 row-span-3">
        <div>

          <div className="flex justify-between">
            <div>{metadata.type}</div>
            <div>
              {!published
                ? <div
                onClick={handlePublishClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="animate-pulse  inline-block cursor-pointer font-light text-red-400 hover:text-green-500">
                {showTooltip && <span className="absolute rounded text-xs shadow-lg p-1 bg-gray-100 text-black -mt-8">Publish Listing</span>}
                <CgLivePhoto className="inline text-xl mr-3 pointer-events-none" />
                {showAvailabilityModal &&
                  <AvailabilityModal
                    listingId={listingId}
                    setShowAvailabilityModal={setShowAvailabilityModal}
                    setPublished={setPublished}
                    setShowTooltip={setShowTooltip}
                  />}
                </div>
                : <div
                  onClick={handleUnpublishClick}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="animate-pulse  inline-block cursor-pointer font-light text-green-500 hover:text-red-400">
                  {showTooltip && <span className="absolute rounded text-xs shadow-lg p-1 bg-gray-100 text-black -mt-8">Unpublish Listing</span>}
                  <CgLivePhoto className="inline text-xl mr-3 pointer-events-none" />
                </div>
              }
              <div onClick={editListing} className="inline cursor-pointer hover:text-gray-800">
                <BiPencil className="inline text-xl mr-3 pointer-events-none" />
              </div>
              <div onClick={deleteListing} className="inline cursor-pointer hover:text-gray-800">
                <BiTrash className="inline text-xl pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold text-black">{listing.title}</div>
          <div className="inline-flex items-center">
            <svg width="20" height="20" fill="orange" className="text-violet-600 inline">
              <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
            </svg>
            <div className="ml-2">
              <span className="font-italic text-black">{getScore()}</span>
              <span className="pl-1 text-black">({getNumReviews()})</span>
              <BsDot className="inline pb-0.5" />
              <span>{listing.address.street} ·</span>
              <span> {listing.address.city}</span>
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
        <div className="text-red-400 text-lg align-bottom text-right flex-end">
          ${listing.price}
          <span className="text-base font-light"> / night</span>
        </div>
      </div>
    </div>
  }
  </>)
}

export default HostListing;

HostListing.propTypes = {
  listing: PropTypes.object,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool
}
