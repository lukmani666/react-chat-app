import React, { useContext } from 'react'
import './navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='navbar flex items-center justify-between bg-[#2f2d52] h-12 p-2'>
      <span className='logo hidden md:block lg:block'>Ola_Dev</span>
      <div className='flex gap-2 items-center'>
        <img src={currentUser.photoURL} alt=""  className='w-8 h-8 rounded-full object-cover'/>
        <span className='text-[#ddddf7]'>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className='bg-[#5d5b8d] text-sm text-[#ddddf7] p-1 rounded absolute bottom-2 left-2 lg:relative mt-4 mr-2'>Log out</button>
      </div>
    </div>
  )
}

export default Navbar