import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import FilteredReviewsModal from './FilteredReviewsModal';
import ProgressBar from '@ramonak/react-progress-bar';
import ReviewSummary from './ListingDetails/ReviewSummary';
import HostReviewSummary from './HostListings/HostReviewSummary';

const StarToolTip = ({ listingInfo, score, hostView }) => {
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
    switch (e.target.id) {
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
      html={(listingInfo.reviews.length > 0
        ? <div>
        <div className="font-bold mb-2">{totalReviews} guest reviews</div>
        <div>
        {Object.values(starDistribution).map((value, idx) =>
          <div
            key={idx + 1}
            className="grid grid-cols-5 gap-1 z-10 mb-2"
          >
            <div id={idx + 1} onClick={prepareModal} className="underline col-start-1 text-sm cursor-pointer hover:text-red-400">{idx + 1} star:</div>
            <div className="pl-3 pr-3 col-start-2 col-span-3">
              <ProgressBar
                bgColor='rgba(248, 113, 113)'
                labelAlignment='left'
                completed={Math.round((value.length / totalReviews) * 100)}
                labelColor='#000000'
              />
            </div>
            <div className="col-start-5 text-sm">{value.length} total</div>
          </div>
        )}
        </div>
      </div>
        : <div>No reviews exist yet!</div>
      )}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        {hostView ? <HostReviewSummary score={score} /> : <ReviewSummary score={score} />}
      </div>
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
  score: PropTypes.string,
  hostView: PropTypes.bool
}
