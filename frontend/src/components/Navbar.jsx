import React from 'react'
import logo from '../images/logoBlackTxt.svg';
import Dropdown from './Dropdown';
import { AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'

export default function Navbar () {
  const userOptions = [{ icon: <AiOutlineUserAdd/>, text: 'Register' }, { icon: <AiOutlineLogin/>, text: 'Login' }]
  const userIcon = <HiUserCircle size="2em" className="text-gray-600 "/>
  return (
    <nav className="bg-white shadow-md px-2 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <img className="mr-auto lg:block h-7 w-auto" src={logo} alt="logo: eye with house inside"/>
      <Dropdown title={userIcon} options={userOptions}/>
    </nav>
  );
}
