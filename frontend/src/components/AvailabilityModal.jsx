import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsPlusCircle } from 'react-icons/bs';
import 'react-day-picker/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import LoginButton from './LoginButton';
import PropTypes from 'prop-types';
import { FetchAPI } from '../util/FetchAPI';

const AvailabilityModal = ({ listingId, setShowAvailabilityModal }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [availabilities, setAvailabilities] = useState([{ start: '', end: '' }]);

  const closeModal = () => {
    setShowAvailabilityModal(false);
    setIsOpen(false)
  }

  const publish = async () => {
    const curr = [...availabilities];

    for (let i = 0; i < curr.length; i++) {
      if (curr[i].start === '' || curr[i].end === '') {
        dateError('Please complete all fields.');
        return;
      }

      if (!isRangeValid(curr[i].start, curr[i].end)) {
        dateError('Start dates must be before end dates.');
        return;
      }

      if (!isDateAfterToday(curr[i].start) || !isDateAfterToday(curr[i].end)) {
        dateError('Dates must commence after today.');
        return;
      }

      const currStart = new Date(curr[i].start);
      const currEnd = new Date(curr[i].end);
      for (let j = i + 1; j < curr.length; j++) {
        if ((currStart <= new Date(curr[j].end)) && (currEnd >= new Date(curr[j].start))) {
          dateError('Dates must not overlap.');
          return;
        }
      }
    }

    const body = { availability: availabilities }
    const response = await FetchAPI(`/listings/${listingId}`, 'PUT', body, JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        dateError('Invalid input.');
        break;
      case 403:
        dateError('You are not authorised to publish this listing.');
        break;
      case 200:
        publishSuccess();
        setShowAvailabilityModal(false);
    }
  }

  const isDateAfterToday = (date) => {
    const today = new Date();
    if (new Date(date) < today) {
      return false;
    }
    return true;
  }

  const isRangeValid = (start, end) => {
    const [startDay, startMonth, startYear] = splitDate(start);
    const [endDay, endMonth, endYear] = splitDate(end);

    if (endYear < startYear) {
      return false;
    } else if (endYear === startYear && endMonth < startMonth) {
      return false;
    } else if (endYear === startYear && endMonth === startMonth &&
                endDay < startDay) {
      return false;
    }
    return true;
  }

  const handleStartDate = (e) => {
    const idx = e.target.title;
    const curr = [...availabilities];

    // Start date is before end date
    curr[idx].start = e.target.value;
    setAvailabilities([...curr]);
  }

  const handleEndDate = (e) => {
    const idx = e.target.title;
    const curr = [...availabilities];

    // // End date is after start date
    curr[idx].end = e.target.value;
    setAvailabilities([...curr]);
  }

  const splitDate = (dateString) => {
    return [parseInt(dateString.slice(8)), parseInt(dateString.slice(5, 7)), parseInt(dateString.slice(0, 4))];
  }

  const dateError = (msg) => {
    toast.error(msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const publishSuccess = () => {
    toast.success('Listing successfully published!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-40 bg-gray-500" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="text-center inline-block w-full max-w-md p-6 my-8  align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-visible">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 flex"
                >
                  <div className="flex-1">
                    Publish Listing
                  </div>
                  <div onClick={closeModal} className="cursor-pointer">
                    X
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500 pb-1">
                    Please select when your property is available.
                  </p>
                </div>
                <div className="justify-center flex pb-2">
                  <hr className="mt-2 mb-2 w-20 border-gray-300" />
                </div>
                <div className="flex flex-row-reverse items-center justify-center gap-3 mb-2 text-gray-500">
                  <label>Add new date range</label>
                  <BsPlusCircle className='hover:text-red-500 cursor-pointer' onClick={() => setAvailabilities([...availabilities, { start: '', end: ' ' }])} />
                </div>
                {availabilities && availabilities.map((availability, index) => (
                  <>
                  <div key={index} className="grid grid-rows-2 w-5/6 m-auto">
                    <div className="row-start-1 grid grid-cols-2 text-left">
                        <label className="font-bold">From: </label>
                        <input
                          type="date"
                          onChange={(e) => handleStartDate(e)}
                          title={index}
                        />
                    </div>
                      <div className="row-start-2 grid grid-cols-2 text-left">
                        <label className="font-bold">To: </label>
                        <input
                          type="date"
                          title={index}
                          onChange={(e) => handleEndDate(e)}
                        />
                      </div>
                    </div>
                  <div className="justify-center flex">
                    <hr className="mt-4 mb-2 w-20 border-gray-300" />
                  </div>
                  </>
                ))}
                <div className="mt-4">
                  <LoginButton
                    handleClick={publish}
                    buttonText={'Publish'}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AvailabilityModal;

AvailabilityModal.propTypes = {
  listingId: PropTypes.string,
  setShowAvailabilityModal: PropTypes.object
}
