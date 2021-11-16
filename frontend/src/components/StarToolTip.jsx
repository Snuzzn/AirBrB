import React from 'react';
// import { FetchAPI } from '../util/FetchAPI';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { HiStar } from 'react-icons/hi';
import FilteredReviewsModal from './FilteredReviewsModal';

const StarToolTip = ({ listingInfo }) => {
  const [showFilteredReviews, setShowFilteredReviews] = React.useState(false);
  const [filteredReviews, setFilteredReviews] = React.useState('');
  const totalReviews = listingInfo.reviews.length;
  const oneStar = listingInfo.reviews.filter(review => review.score === 1);
  const twoStar = listingInfo.reviews.filter(review => review.score === 2);
  const threeStar = listingInfo.reviews.filter(review => review.score === 3);
  const fourStar = listingInfo.reviews.filter(review => review.score === 4);
  const fiveStar = listingInfo.reviews.filter(review => review.score === 5);

  const starDistribution = {
    oneStar: oneStar,
    twoStar: twoStar,
    threeStar: threeStar,
    fourStar: fourStar,
    fiveStar: fiveStar
  }

  const prepareModal = (e) => {
    setShowFilteredReviews(true);
    switch (e.target.title) {
      case '1':
        setFilteredReviews(oneStar);
        break;
      case '2':
        setFilteredReviews(twoStar);
        break;
      case '3':
        setFilteredReviews(threeStar);
        break;
      case '4':
        setFilteredReviews(fourStar);
        break;
      default:
        setFilteredReviews(fiveStar);
        break;
    }
  }

  return (
    <>
    <Tooltip
      position="left"
      interactive="true"
      trigger="mouseenter"
      html={(
      <div className="">
        <div>{totalReviews} guest reviews</div>
        <div>
        {Object.values(starDistribution).map((value, idx) =>
          <div key={idx + 1} className="flex gap-4 z-100 justify-evenly">
           <div title={idx + 1} onClick={prepareModal}>{idx + 1} star:</div>
           <div>{Math.round((value.length / totalReviews) * 100)} %</div>
           <div className="justify-end">{value.length} total</div>
          </div>
        )}
        </div>
      </div>
      )}
    >
      <HiStar
        className="text-red-400 text-xl"
      />
    </Tooltip>
    {showFilteredReviews && <FilteredReviewsModal
      reviews={filteredReviews}
      setShowFilteredReviews={setShowFilteredReviews}
    />}
    </>
  )
}

export default StarToolTip;

StarToolTip.propTypes = {
  listingInfo: PropTypes.object,
  // ref: PropTypes.object
}
