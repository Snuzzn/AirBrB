import React from 'react';
import Listing from './components/Listing';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Listing', () => {
  /**
   * Listing takes in a thumbnail, reviews,
   * title and price as props, and displays all but
   * the id prop.
   */

  it('uses thumbnail string', () => {
    const listing = shallow(<Listing
      thumbnail="test image"
    />);
    expect(listing.find('img').prop('src')).toBe('test image');
  })

  it('thumbnail alt prop is defined for accessibility', () => {
    const listing = shallow(<Listing
      thumbnail="test image"
    />);
    expect(listing.find('img').prop('alt')).toBeDefined();
  })

  it('rendered with length of review list', () => {
    const reviews = [
      {
        score: 5,
        review: 'Great place!'
      },
      {
        score: 1,
        review: 'Not enough almond milk'
      }
    ]

    const listing = shallow(<Listing
      reviews={reviews}
    />);
    expect(listing.find('#review-length').text()).toBe('2');
  })

  it('uses default value of 0 if no reviews', () => {
    const listing = shallow(<Listing/>);
    expect(listing.find('#review-length').text()).toBe('0');
  })

  it('rendered with correctly formatted price of listing', () => {
    const price = 150;
    const listing = shallow(<Listing
      price={price}
    />);
    // Price should have a '$' preceding it
    expect(listing.find('#listing-price').text()).toBe('$150');
  })

  it('review number icon has title for accessibility', () => {
    const listing = shallow(<Listing />);
    expect(listing.find('#review-number-icon').prop('title')).toBeDefined();
  })

  it('review number icon has aria-label for accessibility', () => {
    const listing = shallow(<Listing />);
    expect(listing.find('#review-number-icon').prop('aria-label')).toBeDefined();
  })

  // Snapshots
  it('renders with minimal props', () => {
    const listing = renderer.create(<Listing />).toJSON();
    expect(listing).toMatchSnapshot();
  })

  it('renders with provided props', () => {
    const reviews = [
      {
        score: 5,
        review: 'Great place!'
      },
      {
        score: 1,
        review: 'Not enough almond milk'
      }
    ]

    const listing = renderer.create(<Listing
      thumbnail='I am a thumbnail!'
      reviews={reviews}
      title={'Cool house!'}
      price={150}
    />).toJSON();
    expect(listing).toMatchSnapshot();
  })
})
