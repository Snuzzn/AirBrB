import React from 'react';
import { displayToast } from '../util/Toast';
import { FetchAPI } from '../util/FetchAPI';
import Listing from '../components/Listing';
import HeroSearch from '../components/Hero/HeroSearch';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

const Listings = () => {
  const [displayedListings, setDisplayedListings] = React.useState([]);
  const [allListings, setAllListings] = React.useState([]);

  React.useEffect(() => {
    const fetchAllListings = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const email = JSON.parse(localStorage.getItem('email'));
      let bookingsData = [];
      if (token !== '') {
        // If logged in, get all bookings data
        const response = await FetchAPI('/bookings', 'GET', '', token);
        switch (response.status) {
          case 403:
            displayToast('You are not authorised to access bookings data.');
            break;
          case 200:
            bookingsData = [...response.data.bookings];
            break;
          default:
            displayToast('Something went wrong!');
            break;
        }
      }
      const response = await FetchAPI('/listings', 'GET');
      let listingsData = [];
      let userBookings = [];
      switch (response.status) {
        case 403: {
          displayToast('You are not authorised to access this page.');
          break;
        }
        case 200: {
          listingsData = response.data.listings;
          // Sort the list alphabetically
          listingsData.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          })
          const publishedListingsData = [];
          for (const listing of listingsData) {
            const res = await FetchAPI(`/listings/${listing.id}`, 'GET');
            if (res.status === 200 && res.data.listing.published) {
              // Only display published listings on landing page
              publishedListingsData.push(listing);
            }
          }
          for (const listing of publishedListingsData) {
            // Get all bookings of this listing
            const listingBookings = bookingsData.filter(booking => parseInt(booking.listingId) === listing.id);
            for (const listingBooking of listingBookings) {
              // Find any bookings made by the user by checking dateRange schema
              // "dateRange": {"guest": email, "start": date, "end": date}
              if (listingBooking.dateRange?.guest === email && listingBooking.status !== 'declined') {
                // User has booked this listing, so move on to the next listing
                userBookings = [...userBookings, listing];
                break;
              }
            }
          }
          // Build list of listings, with user booked listings first
          const nonUserBookedListings = publishedListingsData.filter(listing => {
            const listingId = listing.id;
            for (const userBooking of userBookings) {
              // Exclude user booked listings
              if (userBooking.id === listingId) return false;
            }
            return true;
          })
          setDisplayedListings([...userBookings.concat(nonUserBookedListings)]);
          setAllListings([...userBookings.concat(nonUserBookedListings)]);
          break;
        }
        default: {
          displayToast('Something went wrong!');
          break;
        }
      }
    }
    fetchAllListings()
  }, []);

  return (
    <div id="hero">
      <Fade className="flex flex-row">
        <HeroSearch setDisplayedListings={setDisplayedListings} allListings={allListings}/>
        <div className="mt-10">
          <div className="grid grid-cols-auto-fill  gap-7 " id="searchResults">
              {displayedListings.map((listing) => {
                // console.log(displayedListings);
                return (
                <Fade key={listing.id}>
                  <Link to={`/listing/${listing.id}`} >
                    <Listing
                      thumbnail={listing.thumbnail}
                      reviews={listing.reviews}
                      title={listing.title}
                      price={listing.price}
                    />
                  </Link>
                </Fade>)
              })}
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default Listings;
