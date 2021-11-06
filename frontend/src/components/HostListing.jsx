import React from 'react';
import PropTypes from 'prop-types';

const HostListing = ({ listing }) => {
  return (
    <>
    {listing.id}
    {listing.thumbnail}
    </>
  )
}

export default HostListing;

HostListing.propTypes = {
  listing: PropTypes.object
}
