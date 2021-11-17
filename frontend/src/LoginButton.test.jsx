import React from 'react';
import LoginButton from './components/LoginButton';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { AiOutlineArrowRight } from 'react-icons/ai';

describe('LoginButton', () => {
  /**
   * LoginButton takes in a click function and optional text
   * to display. It is used across multiple components,
   * including for login and registration.
   */

  const noop = () => {};

  it('triggers onClick event handler when clicked', () => {
    const onClick = jest.fn();
    shallow(<LoginButton handleClick={onClick} />).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  })

  it('uses custom title', () => {
    const customText = 'custom text';
    const button = shallow(<LoginButton
      onClick={noop}
      buttonText={customText}
    />);
    // Button contains one div to hold the custom text
    expect(button.find('div').text()).toBe(customText);
  })

  it('uses default title if no custom text provided', () => {
    const button = shallow(<LoginButton
      onClick={noop}
    />);
    // Button's default text is 'Submit'
    expect(button.find('div').text()).toBe('Submit');
  })

  it('contains icon indicating submission', () => {
    const button = shallow(<LoginButton
      onClick={noop}
    />);
    expect(button.contains(<AiOutlineArrowRight />))
  })

  it('icon has aria-label prop for accessibility', () => {
    const button = shallow(<LoginButton
      onClick={noop}
    />);
    expect(button.find(<AiOutlineArrowRight />).find('aria-label')).toBeDefined();
  })

  // Snapshots
  it('renders with minimal props', () => {
    const button = renderer.create(<LoginButton
      onClick={noop}
    />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('renders with provided text', () => {
    const button = renderer.create(<LoginButton
      onClick={noop}
      type='I am a button!'
    />).toJSON();
    expect(button).toMatchSnapshot();
  })
})
