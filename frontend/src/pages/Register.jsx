import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Warning from '../components/Warning';
import LoginButton from '../components/LoginButton';
import { FetchAPI } from '../util/FetchAPI';

const Register = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [initialPassword, setInitialPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState('');

  const throwWarning = (text) => {
    setWarningText(text)
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  }

  const submitRegistration = async () => {
    if (email.trim() === '' || confirmPassword.trim() === '' || name.trim() === '') {
      throwWarning('Email, name and password cannot be empty.');
      return;
    } else if (initialPassword !== confirmPassword) {
      throwWarning('Your passwords must match!');
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
        console.log(response.data?.token);
        closeModal();
        break;
      default:
        throwWarning('Unknown error!');
    }
  }

  // If modal is closed, navigate to home
  const closeModal = () => {
    setIsOpen(false);
    navigate('/');
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
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Create Account
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
                    setState={setInitialPassword}
                  />
                  <TextInput
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm Password'
                    setState={setConfirmPassword}
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
