import React from 'react'
import { displayToast } from '../../util/Toast'
import PropTypes from 'prop-types';

function RangeInputs ({ initMax, setRange }) {
  const [min, setMin] = React.useState('')
  const [max, setMax] = React.useState('')

  const checkRangeValidity = () => {
    if (min !== '' && max !== '' && min > max) {
      displayToast('Min value cannot be higher than max value', 'error')
      setMin('')
      setMax('')
    } else {
      setRange([min, max])
    }
  }

  return (
    <div className="mt-1 flex gap-2">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Min</label>
        <input type="number" placeholder={1} className="w-24 p-1 border border-gray-300 rounded"
          value={min} onChange={e => setMin(parseInt(e.target.value))} onBlur={checkRangeValidity} />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Max</label>
        <input type="number" placeholder={initMax} className="w-24 p-1 border border-gray-300 rounded"
          value={max} onChange={e => setMax(parseInt(e.target.value))} onBlur={checkRangeValidity} />
      </div>
    </div>
  )
}

export default RangeInputs

RangeInputs.propTypes = {
  initMax: PropTypes.number,
  setRange: PropTypes.func,
}
