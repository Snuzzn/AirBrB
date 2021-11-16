import React from 'react';
import { shallow } from 'enzyme';
import { IoBedOutline } from 'react-icons/io5'
import Bedrooms from './components/ListingDetails/Bedrooms';

describe('Bedrooms', () => {
  /**
   * BookingInfoCard takes title, message, icon, and background colour to
   * display the appropriate metric. It is used in the Booking Details page.
   */
  const listingInfo = { metadata: { bedrooms: [{ title: 'Room1', count: 2 }, { title: 'Room2', count: 4 }] } }

  it('renders 1st bedroom title', () => {
    const bedrooms = shallow(<Bedrooms listingInfo={listingInfo} />)
    const bedroom = bedrooms.find('#Room1').text()
    expect(bedroom).toEqual('Room1')
  })

  it('renders 1st bedroom count', () => {
    const bedrooms = shallow(<Bedrooms listingInfo={listingInfo} />)
    const bedroom = bedrooms.find('#Room1count').text()
    expect(bedroom).toEqual('2 beds')
  })

  it('renders 2nd bedroom title', () => {
    const bedrooms = shallow(<Bedrooms listingInfo={listingInfo} />)
    const bedroom = bedrooms.find('#Room2').text()
    expect(bedroom).toEqual('Room2')
  })

  it('renders 2nd bedroom count', () => {
    const bedrooms = shallow(<Bedrooms listingInfo={listingInfo} />)
    const bedroom = bedrooms.find('#Room2count').text()
    expect(bedroom).toEqual('4 beds')
  })

  it('contains a bed icon', () => {
    const bedrooms = shallow(<Bedrooms listingInfo={listingInfo} />)
    const icon = <IoBedOutline className="text-5xl text-gray-600"/>
    expect(bedrooms.contains(icon)).toEqual(true)
  })

})
