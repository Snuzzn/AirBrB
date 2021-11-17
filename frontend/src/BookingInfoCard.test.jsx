import React from 'react';
import { shallow } from 'enzyme';
import BookingInfoCard from './components/BookingDetails/BookingInfoCard';
import { HiCake } from 'react-icons/hi'
import renderer from 'react-test-renderer'

describe('BookingInfoCard', () => {
  // const noop = () => {};
  /**
   * BookingInfoCard takes title, message, icon, and background colour to
   * display the appropriate metric. It is used in the Booking Details page.
   */

  it('renders title', () => {
    const card = shallow(<BookingInfoCard title='$30'/>)
    const title = card.find('#bookingMetricText').text()
    expect(title).toEqual('$30')
  })

  it('renders message', () => {
    const card = shallow(<BookingInfoCard message='Yearly Profit'/>)
    const message = card.find('#bookingMetricMessage').text()
    expect(message).toEqual('Yearly Profit')
  })

  it('renders icon', () => {
    const card = shallow(<BookingInfoCard icon={<HiCake/>}/>)
    const icon = card.find('#bookingMetricIcon')
    const inputIcon = <HiCake/>
    expect(icon.contains(inputIcon)).toEqual(true)
  })

  it('applies appropriate background colour around icon', () => {
    const card = shallow(<BookingInfoCard bg="bg-red-200"/>)
    const icon = card.find('#bookingMetricIcon')
    expect(icon.hasClass('bg-red-200')).toEqual(true)
  })

  // Snapshots
  it('renders with minimal props', () => {
    const button = renderer.create(<BookingInfoCard/>).toJSON();
    expect(button).toMatchSnapshot();
  })
})
