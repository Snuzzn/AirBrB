import React from 'react';
import emptyStreet from '../images/emptyStreet.svg';

const EmptyList = () => {
  return (
    <>
      <img src={emptyStreet} alt="empty street with park benches represents lack of listings" className="mt-20 w-8/12 max-w-lg self-center" />
      <div className="text-lg font-extralight mt-5 self-center">You have no listings yet...</div>
    </>
  )
}

export default EmptyList;
