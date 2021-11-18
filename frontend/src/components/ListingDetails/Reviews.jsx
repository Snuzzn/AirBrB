import React from 'react';
import locationReview from '../../images/locationReview.svg'
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import { displayToast } from '../../util/Toast';
import { FetchAPI } from '../../util/FetchAPI';
import GuestReview from './GuestReview';

function Reviews ({ listingInfo, listingId, onSubmit }) {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const [booked, setBooked] = React.useState(false);

  React.useEffect(async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const email = JSON.parse(localStorage.getItem('email'));

    if (token) {
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
    }
  }, [])

  const handleReview = (e) => {
    const reviewText = e.target.value;
    setReview(reviewText);
  }

  const submitReview = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (review.trim() === '') {
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
        score: rating,
        reviewer: JSON.parse(localStorage.getItem('email'))
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
        onSubmit();
        setReview('');
        setRating(0);
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
        <label className="font-semibold text-base text-gray-700">
          Describe Your Experience
        </label>
        <p className="text-gray-500">Your review will be public on the listing page.</p>
        <textarea
          placeholder="Leave a review"
          className="p-2 text-gray-500 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
          onChange={handleReview}
          value={review}
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
          <Ratings.Widget id="4star" />
          <Ratings.Widget />
      </Ratings>
      <button aria-label="Submit a review" id="submitReviewBtn" className="bg-red-400 p-3 pl-5 pr-5 text-white rounded-xl mt-1 hover:bg-red-500 w-min" onClick={submitReview}>
        Submit
      </button>
      </div>
    }
    <div className="italic text-base text-gray-700 mb-2">
      What other guests are saying...
    </div>
    <div className="flex flex-col gap-9 mb-10" id="reviews">
      { listingInfo.reviews && listingInfo.reviews.length !== 0
        ? ([...listingInfo.reviews].reverse().map((review, idx) => (<GuestReview review={review} key={idx} />)))
        : (<div className="flex flex-col items-center">
          <img src={locationReview} alt="Person next to house below a card with a navigation symbol on top" className="w-1/2 sm:w-1/3 lg:w-1/4" />
          <p className="text-gray-700">No reviews yet...</p>
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
  onSubmit: PropTypes.func,
}
