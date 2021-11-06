import React from 'react'
import logo from '../images/logoBlackTxt.svg';
import Dropdown from './Dropdown';
import { AiOutlineUserAdd, AiOutlineLogin, AiOutlineHome, AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar ({ tokenState, deauthenticate }) {
  const userOptions = [{ icon: <AiOutlineUserAdd alt="Register icon: user being added"/>, text: 'Register', to: '/register', loggedIn: false }, { icon: <AiOutlineLogin alt="Login icon: arrow entering circle"/>, text: 'Login', to: '/login', loggedIn: false }, { icon: <AiOutlineHome alt="Your listings Icon: house icon"/>, text: 'Your Listings', to: '/hosted-listings', loggedIn: true }, { icon: <AiOutlineSearch alt="All listings icon: city icon"/>, text: 'All Listings', to: '/listings', loggedIn: true }, { icon: <AiOutlineLogout alt='Logout icon: arrow leaving circle' />, text: 'Logout', loggedIn: true, onClick: deauthenticate }]
  const userIcon = <HiUserCircle size="2em" className="text-gray-600" alt="genericUserIcon"/>
  return (
    <nav className="bg-white shadow-md px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <Link to=""><img className="mr-auto lg:block h-7 w-auto" src={logo} alt="AirBrB logo: eye with house inside iris"/></Link>
      <Dropdown title={userIcon} options={userOptions} tokenState={tokenState} />
    </nav>
  );
}

Navbar.propTypes = {
  tokenState: PropTypes.object,
  deauthenticate: PropTypes.func
}
