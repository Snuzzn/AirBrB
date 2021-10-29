import React from 'react'
import logo from '../images/logoBlackTxt.svg';
import Dropdown from './Dropdown';
import { AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'

export default function Navbar () {
  const userOptions = [{ icon: <AiOutlineUserAdd alt="Register icon: user being added"/>, text: 'Register' }, { icon: <AiOutlineLogin alt="Login icon: arrow entering circle"/>, text: 'Login' }]
  const userIcon = <HiUserCircle size="2em" className="text-gray-600" alt="genericUserIcon"/>
  return (
    <nav className="bg-white shadow-md px-2 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <img className="mr-auto lg:block h-7 w-auto" src={logo} alt="AirBrB logo: eye with house inside iris"/>
      <Dropdown title={userIcon} options={userOptions}/>
    </nav>
  );
}
