import React from 'react';
// import { FetchAPI } from '../util/FetchAPI';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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
    <ReactTooltip
      id='rating-distri'
      place='left'
      delayHide={3000}
      className='hover:opacity-100 hover:visible'
      effect="solid"
    >
        <div>{totalReviews} guest reviews</div>
        {Object.values(starDistribution).map((value, idx) =>
          <div key={idx} className="flex justify-evenly">
           <div>{idx} star</div>
           <div>{Math.round((value.length / totalReviews) * 100)} %</div>
           <div>{value.length} total</div>
          </div>
        )}
    </ReactTooltip>
  )
}

export default StarToolTip;

StarToolTip.propTypes = {
  listingInfo: PropTypes.object,
}
