import React from 'react'
import PropTypes from 'prop-types';

export function HeaderRow () {
  return (
    <thead>
      <tr className="text-left border-b">
        <th className="p-2 font-semibold text-gray-600">Guest</th>
        <th className="p-2 font-semibold text-gray-600">Check In</th>
        <th className="p-2 font-semibold text-gray-600">Check Out</th>
        <th className="p-2 font-semibold text-gray-600">Price</th>
        <th className="p-2 font-semibold text-gray-600">Status</th>
      </tr>
    </thead>
  )
}

export function BodyRow ({ item }) {
  return (
    <>
      <td className="p-2">{item.dateRange.guest}</td>
      <td className="p-2">{item.dateRange.start}</td>
      <td className="p-2">{item.dateRange.end}</td>
      <td className="p-2">{item.totalPrice}</td>
    </>
  )
}

BodyRow.propTypes = {
  item: PropTypes.object,
}
