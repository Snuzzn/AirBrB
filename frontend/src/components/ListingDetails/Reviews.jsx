import React from 'react';
import { HiStar, HiUserCircle } from 'react-icons/hi'
import locationReview from '../../images/locationReview.svg'
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import { displayToast } from '../../util/Toast';
import { FetchAPI } from '../../util/FetchAPI';

function Reviews ({ listingId }) {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const [booked, setBooked] = React.useState(false);
  const [listingInfo, setListingInfo] = React.useState([]);
  const [newReview, setNewReview] = React.useState(false);

  React.useEffect(async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const email = JSON.parse(localStorage.getItem('email'));

    if (!token) return;

    let bookings = [];
    const res = await FetchAPI('/bookings', 'GET', '', token);
    switch (res.status) {
      case 403:
        displayToast('You are not authorised to view reviews.');
        break;
      case 200:
        // Get this user's bookings for this listing that have been accepted
        bookings = res.data.bookings
          .filter(booking => booking.listingId === listingId)
          .filter(booking => booking.owner === email)
          .filter(booking => booking.status === 'accepted');
        break;
      default:
        displayToast('Uh oh, something went wrong!', 'error');
        break;
    }

    if (bookings.length > 0) {
      setBooked(bookings);
    }

    const response = await FetchAPI(`/listings/${listingId}`, 'GET', '', '');
    switch (response.status) {
      case 400:
        displayToast('Could not open listing', 'error')
        break;
      case 200: {
        console.log(response.data.listing);
        setListingInfo(response.data.listing);
        break;
      }
      default:
        displayToast('Something went wrong!', 'error');
    }
  }, [newReview])

  const handleReview = (e) => {
    const reviewText = e.target.value.trim();
    setReview(reviewText);
  }

  const submitReview = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (review === '') {
      displayToast('Please provide review details.', 'error');
      return;
    }

    if (rating === 0) {
      displayToast('Please provide a star rating.', 'error');
      return;
    }

    const body = {
      review: {
        review: review,
        score: rating
      }
    }
    const bookingId = booked[0].id;
    const res = await FetchAPI(`/listings/${listingId}/review/${bookingId}`, 'PUT', body, token);
    switch (res.status) {
      case 400:
        displayToast(res.data.error, 'error');
        break;
      case 403:
        displayToast('You are not authorised to leave a review', 'error');
        break;
      case 200:
        displayToast('Thank you for your feedback!', 'success');
        setNewReview(!newReview);
        break;
      default:
        displayToast('Uh oh, something went wrong!', 'error');
        break;
    }
  }

  return (
    <>
    {Object.keys(listingInfo).length > 0 && booked.length > 0 &&
      <div id="create-review" className="flex flex-col gap-2">
        <label className="font-semibold text-lg text-gray-700">
          Describe Your Experience
        </label>
        <p className="text-gray-500">Your review will be public on the listing page.</p>
        <textarea
          placeholder="Leave a review"
          className="pl-1 text-gray-500 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
          onChange={handleReview}
        />
        <Ratings
          changeRating={setRating}
          widgetRatedColors="rgba(248, 113, 113)"
          rating={rating}
          widgetSpacings='2px'
          widgetDimensions='25px'
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
      </Ratings>
      <button aria-label="Submit a review" className="bg-red-400 p-3 pl-5 pr-5 text-white rounded-xl mt-1 hover:bg-red-500 w-min" onClick={submitReview}>
        Submit
      </button>
      </div>
    }
    <div className="font-semibold text-lg text-gray-700 mt-2">
      What other guests are saying...
    </div>
    <div className="flex flex-col gap-9 mb-10" id="reviews">
      { listingInfo.reviews && listingInfo.reviews.length !== 0
        ? ([...listingInfo.reviews].reverse().map((review, idx) => (<div className="flex gap-5 items-center" key={idx}>
          <div className="w-10 self-start">
            <HiUserCircle size="3em" className="text-gray-600 " />
          </div>
          <div>
            <div className="flex gap-1">
              <HiStar className="text-red-400 text-xl"/>
              {review.score >= 2 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
              {review.score >= 3 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
              {review.score >= 4 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
              {review.score === 5 ? <HiStar className="text-red-400 text-xl" /> : <HiStar className="text-gray-400 text-xl" />}
            </div>
            <p className="text-gray-600 max-w-5xl">{review.review}</p>
            <p className="font-light text-gray-400 italic text-sm">{JSON.parse(localStorage.getItem('email'))}</p>
          </div>
        </div>)))
        : (<div className="flex flex-col items-center">
          <img src={locationReview} alt="Person next to house below a card with a navigation symbol on top" className="w-1/2 sm:w-1/3 lg:w-1/4" />
          <p>No reviews yet...</p>
        </div>)
      }
    </div>
    </>
  )
}

export default Reviews

Reviews.propTypes = {
  listingInfo: PropTypes.object,
  listingId: PropTypes.string,
}
