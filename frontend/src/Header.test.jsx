import React from 'react';
import Header from './components/ListingDetails/Header';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Header', () => {
  /**
   * Header takes in a listing info object, and then
   * extracts and displays data for the listing title,
   * address and reviews,
   */

  // Note that for all fields except 'reviews', the website
  // will not allow the user to enter empty strings
  const listingInfo = {
    title: 'Simpsons Residence',
    address: {
      street: '742 Evergreen Terrace',
      city: 'Springfield'
    },
    reviews: [
      {
        score: 3,
        review: 'Sofa was really old'
      },
      {
        score: 4,
        review: 'That neighbour Ned is a bit odd'
      }
    ]
  }

  
  it('renders with listing title', () => {
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-title').text()).toBe(listingInfo.title);
  })
  
  it('renders with listing street', () => {
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-street').text()).toContain(listingInfo.address.street);
  })
  
  it('renders with listing city', () => {
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-city').text()).toContain(listingInfo.address.city);
  })
  
  it('renders with number of reviews', () => {
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-reviews').text()).toBe('2 reviews');
  })
  
  it('calculates average score and rounds to 2 decimal place', () => {
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-score').text()).toBe('3.5');
  })

  it('uses hyphen if no review scores exist', () => {
    listingInfo.reviews = [];
    const header = shallow(<Header listingInfo={listingInfo} />);
    expect(header.find('#header-score').text()).toBe('-');
  })

  // Snapshots
  it('renders with all listing info data', () => {
    const header = renderer.create(<Header listingInfo={listingInfo} />).toJSON();
    expect(header).toMatchSnapshot();
  })
})
