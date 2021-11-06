import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Warning from '../components/Warning';
import LoginButton from '../components/LoginButton';
import { FetchAPI } from '../util/FetchAPI';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState('');

  // Displays a warning
  const throwWarning = (text) => {
    setWarningText(text)
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  }

  // Submits login data
  const submitLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      throwWarning('Email and password cannot be empty.');
      return;
    }

    const response = await FetchAPI('/user/auth/login', 'POST', { email, password });
    switch (response.status) {
      case 400:
        throwWarning(response.data?.error);
        break;
      case 200:
        authenticate(response.data.token);
        closeModal();
        break;
      default:
        throwWarning('Unknown error!');
    }
  }

  // If modal is closed, navigate to home
  const closeModal = () => {
    setIsOpen(false);
    navigate('/listings');
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-0 overflow-y-auto"
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
              <div className="text-center inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 flex"
                >
                  <div className="flex-1">
                    Account Login
                  </div>
                  <div onClick={closeModal} className="cursor-pointer">
                    X
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500 pb-4">
                    Please enter your email and password.
                  </p>
                </div>

                {showWarning && <Warning warnText={warningText} />}

                <div className='focus:border-red-400'>
                  <TextInput
                    label='Email'
                    type='text'
                    placeholder='Email'
                    setState={setEmail}
                  />
                  <TextInput
                    label='Password'
                    type='password'
                    placeholder='Password'
                    setState={setPassword}
                  />
                </div>

                <div className="mt-4">
                  <LoginButton handleClick={submitLogin} buttonText={'Log in'} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Login;

Login.propTypes = {
  authenticate: PropTypes.func
}
