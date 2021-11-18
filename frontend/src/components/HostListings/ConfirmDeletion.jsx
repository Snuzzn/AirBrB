import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { FetchAPI } from '../../util/FetchAPI';
import { displayToast } from '../../util/Toast';
import { AiOutlineWarning } from 'react-icons/ai';

const ConfirmDeletion = ({ listingId, setRefresh, refresh, setShowDeletionModal }) => {
  const [isOpen, setIsOpen] = useState(true)

  const closeModal = () => {
    setShowDeletionModal(false);
    setIsOpen(false)
  }

  const deleteListing = async () => {
    const response = await FetchAPI(`/listings/${listingId}`, 'DELETE', '', JSON.parse(localStorage.getItem('token')));
    switch (response.status) {
      case 400:
        displayToast('Could not delete listing', 'error')
        break;
      case 200:
        displayToast('Successfully deleted listing', 'success')
        closeModal();
        setRefresh(!refresh);
        break;
      case 403:
        displayToast('You are not authorised to delete this listing', 'error');
        break;
      default:
        displayToast('Something went wrong!', 'error');
    }
  }

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
                className="text-xl font-medium leading-6 text-gray-700 flex justify-center"
              >
                <AiOutlineWarning className="text-red-400 text-2xl" />
                  Are you sure you want to delete this listing?
                <AiOutlineWarning className="text-red-400 text-2xl" />
              </Dialog.Title>
              <div className="mt-4 flex justify-evenly gap-5">
                <button className="bg-red-400 text-white rounded-xl pt-2 pb-2 pl-5 pr-5 hover:animate-pulse" aria-label="Confirm deletion of listing" onClick={deleteListing}>Yes</button>
                <button className="bg-green-400 text-white rounded-xl pt-2 pb-2 pl-5 pr-5 hover:animate-pulse" aria-label="Close deletion modal" onClick={closeModal}>No</button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmDeletion;

ConfirmDeletion.propTypes = {
  listingId: PropTypes.string,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  setShowDeletionModal: PropTypes.func
}
