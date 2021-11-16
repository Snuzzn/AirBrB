import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import GuestReview from './ListingDetails/GuestReview';

const FilteredReviewsModal = ({ reviews, setShowFilteredReviews }) => {
  const [isOpen, setIsOpen] = useState(true)

  const closeModal = () => {
    setShowFilteredReviews(false);
    setIsOpen(false)
  }
  console.log(reviews);

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-700 text-center flex"
                >
                  <div className="flex-1">
                    { reviews && `Viewing ${reviews[0].score} Star Reviews`}
                  </div>
                  <div onClick={closeModal} className="cursor-pointer">
                    X
                  </div>
                </Dialog.Title>
                { reviews && reviews.reverse().map((review, idx) => (
                  <>
                    <div key={idx} className="m-2">
                      <GuestReview review={review} key={idx} />
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  )
}

export default FilteredReviewsModal;

FilteredReviewsModal.propTypes = {
  reviews: PropTypes.array,
  setShowFilteredReviews: PropTypes.func
}
