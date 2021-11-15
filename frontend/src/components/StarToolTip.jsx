import React from 'react';
// import { FetchAPI } from '../util/FetchAPI';
import PropTypes from 'prop-types';

const StarToolTip = ({ listingInfo }) => {
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

  console.log(starDistribution)
  return (
    <div className="relative">
      <div className="absolute right-10 z-10000000">
        <div>{totalReviews} guest reviews</div>
        {Object.values(starDistribution).map((value, idx) =>
          <div key={idx} className="flex justify-evenly z-1000">
           <div>{idx} star</div>
           <div>{Math.round((value.length / totalReviews) * 100)} %</div>
           <div>{value.length} total</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StarToolTip;

StarToolTip.propTypes = {
  listingInfo: PropTypes.object,
  // ref: PropTypes.object
}
