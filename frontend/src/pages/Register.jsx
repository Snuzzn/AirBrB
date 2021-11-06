import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Warning from '../components/Warning';
import LoginButton from '../components/LoginButton';
import { FetchAPI } from '../util/FetchAPI';
import EmailValidator from 'email-validator';
import PropTypes from 'prop-types';
import { displayToast } from '../util/Toast';

const Register = ({ authenticate }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [initialPassword, setInitialPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [timer, setTimer] = useState('');

  // Display a warning above text input boxes
  const throwWarning = (text, temp = true) => {
    setWarningText(text)
    setShowWarning(true);
    if (temp) {
      setTimeout(() => setShowWarning(false), 3000);
    }
  }

  // If confirm password has been entered, check for match after 0.8s
  const handleInitialPassword = (value) => {
    setInitialPassword(value);
    if (confirmPassword !== '') {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        if (confirmPassword === value) {
          setShowWarning(false);
        } else {
          throwWarning('Your passwords must match!', false);
        }
      }, 600));
    }
  }

  // Check for match with initial password after 0.8s
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      if (initialPassword === value) {
        setShowWarning(false);
      } else {
        throwWarning('Your passwords must match!', false);
      }
    }, 800));
  }

  // Submit registration form and update local storage with token
  const submitRegistration = async () => {
    if (email.trim() === '' || confirmPassword.trim() === '' || name.trim() === '') {
      throwWarning('Email, name and password cannot be empty.');
      return;
    } else if (initialPassword !== confirmPassword) {
      throwWarning('Your passwords must match!');
      return;
    }

    if (!EmailValidator.validate(email)) {
      throwWarning('Please enter a valid email.')
      return;
    }

    const response = await FetchAPI('/user/auth/register', 'POST', {
      email,
      password: confirmPassword,
      name
    })
    switch (response.status) {
      case 400:
        throwWarning(response.data?.error);
        break;
      case 200:
        authenticate(response.data.token);
        closeModal();
        displayToast('Successfully Signed Up', 'success')
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
              <div className="text-center inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 flex"
                >
                  <div className="flex-1">
                    Create Account
                  </div>
                  <div onClick={closeModal} className="cursor-pointer">
                    X
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500 pb-4">
                    Please enter your email, name and password.
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
                    label='Name'
                    type='text'
                    placeholder='Name'
                    setState={setName}
                  />
                  <TextInput
                    label='Password'
                    type='password'
                    placeholder='Password'
                    setState={handleInitialPassword}
                  />
                  <TextInput
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm Password'
                    setState={handleConfirmPassword}
                  />
                </div>

                <div className="mt-4">
                  <LoginButton handleClick={submitRegistration} buttonText={'Sign up'} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Register;

Register.propTypes = {
  authenticate: PropTypes.func
}
