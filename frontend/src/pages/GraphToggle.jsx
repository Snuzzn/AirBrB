import React from 'react'
import { Switch } from '@headlessui/react'
import PropTypes from 'prop-types';

function GraphToggle ({ isGraphVisible, setIsGraphVisibile }) {
  return (
    <Switch.Group >
    <div className="flex items-center ml-auto">
      <Switch
        checked={isGraphVisible}
        onChange={setIsGraphVisibile}
        className={`${
          isGraphVisible ? 'bg-red-500' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors `}
      >
        <span
          className={`${
            isGraphVisible ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
      <Switch.Label className="ml-2 text-gray-700">Profit Graph</Switch.Label>
    </div>
  </Switch.Group>
  )
}

export default GraphToggle

GraphToggle.propTypes = {
  isGraphVisible: PropTypes.bool,
  setIsGraphVisibile: PropTypes.func
}
