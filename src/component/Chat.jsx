import React, { useContext } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { FiVideo } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='chat rounded-none'>
      <div className="chat_info bg-[#5d5b8d] h-12 flex items-center justify-between p-2.5">
        <span className='text-xl text-[#ddddf7]'>{data.user?.displayName}</span>
        <div className="chat_icons flex gap-4 text-xl text-[#ddddf7] cursor-pointer">
          <FiUserPlus />
          <FiVideo />
          <BsThreeDots />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat