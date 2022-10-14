import React, { useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {

  return (
    <div className='sidebar relative'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar