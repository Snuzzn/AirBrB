import React from 'react'
import PropTypes from 'prop-types';

function RangeInputs ({ initMax, setRange, range }) {
  // const [min, setMin] = React.useState('')
  // const [max, setMax] = React.useState('')
  // const handleChange = (e) => {
  //   const val = parseInt(e.target.value)
  //   if (e.target.name === 'min') {
  //     setMin(val)
  //     setRange([val, max])
  //   } else if (e.target.name === 'max') {
  //     setMax(val)
  //     setRange([min, val])
  //   }
  // const checkRangeValidity = () => {
  //   if (min !== '' && max !== '' && min > max) {
  //     displayToast('Min value cannot be higher than max value', 'error')
  //     setMin('')
  //     setMax('')
  //   } else {
  //     setRange([min, max])
  //   }
  // }

  // TODO: don't allow min to be higher than max
  return (
    <div className="mt-1 flex gap-2">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Min</label>
        <input type="number" name="min" placeholder={1} className="w-24 p-1 border border-gray-300 rounded"
          value={range[0]} onChange={e => setRange([e.target.value, range[1]])} />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Max</label>
        <input type="number" name="max" placeholder={initMax} className="w-24 p-1 border border-gray-300 rounded"
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
