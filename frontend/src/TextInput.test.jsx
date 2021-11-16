import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from './components/TextInput';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('TextInput', () => {
    const noop = () => {};

    it('triggers onChange event on user input', () => {
        const onChange = jest.fn();
        const inputField = shallow(<TextInput 
            type='text'
            setState={onChange} 
        />);
        const event = {target: { value: 'a' }}
        inputField.simulate('change', event);
        expect(onChange).toHaveBeenCalledTimes(1);
    })

    it('captures user input on change', () => {
        const onChange = jest.fn();
        const inputField = shallow(<TextInput 
            type='text'
            setState={onChange} 
        />);
        const event = {target: { value: 'testing this value' }}
        inputField.simulate('change', event);
        expect(onChange).toHaveBeenCalledWith('testing this value');
    })

    it('aria-label is defined with prop value', () => {
        const inputField = shallow(<TextInput 
            label='Test Label!' 
            setState={noop} 
        />);
        expect(inputField.prop('aria-label')).toBe('Test Label!');
    })

    it('type is defined with prop value', () => {
        const inputField = shallow(<TextInput 
            type='text'
            setState={noop} 
        />);
        expect(inputField.prop('type')).toBe('text');
    })

    it('placeholder is defined with prop value', () => {
        const inputField = shallow(<TextInput 
            type='text'
            placeholder='Test Placeholder!'
            setState={noop} 
        />);
        expect(inputField.prop('placeholder')).toBe('Test Placeholder!');
    })

    it('uses placeholder text defined in prop', () => {
        render(<TextInput 
            type='text'
            placeholder='Placeholder!'
            setState={noop} 
        />);
        expect(screen.getByPlaceholderText('Placeholder!')).toBeInTheDocument();
    })

    it('uses default placeholder text if no prop passed in', () => {
        render(<TextInput 
            type='text'
            setState={noop} 
        />);
        expect(screen.getByPlaceholderText('Please enter details')).toBeInTheDocument();
    })

    // Snapshots
    it('renders with minimal props', () => {
        const inputField = renderer.create(<TextInput onChange={noop} />).toJSON();
        expect(inputField).toMatchSnapshot();
    })

    it('renders with provided placeholder and type', () => {
        const inputField = renderer.create(<TextInput 
            onChange={noop}
            type='text'
            placeholder='placeholder test'
        />).toJSON();
        expect(inputField).toMatchSnapshot();
    })
})