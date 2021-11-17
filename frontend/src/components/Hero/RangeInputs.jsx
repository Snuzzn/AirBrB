import React from 'react'
import PropTypes from 'prop-types';

function RangeInputs ({ initMax, setRange, range }) {
  return (
    <div className="mt-1 flex gap-2">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Min</label>
        <input aria-label="range start" type="number" name="min" placeholder={1} className="w-24 p-1 border border-gray-300 rounded"
          value={range[0]} onChange={e => setRange([e.target.value, range[1]])} />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Max</label>
        <input aria-label="range end" type="number" name="max" placeholder={initMax} className="w-24 p-1 border border-gray-300 rounded"
          value={range[1]} onChange={e => setRange([range[0], e.target.value])} />
      </div>
    </div>
  )
}

export default RangeInputs

RangeInputs.propTypes = {
  initMax: PropTypes.number,
  setRange: PropTypes.func,
  range: PropTypes.array
}
