import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import './message.css'

const Message = ({message}) => {

  const ref = useRef();

  useEffect(() =>{
    ref.current?.scrollIntoView({behaviour:"smooth"})
  }, [message])
 
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"} flex gap-2 md:gap-5 lg:gap-5 mb-5`}>
      <div className="message_info flex flex-col">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
         alt="" className='w-8 h-8 rounded-full object-cover'
        />
        <span className='text-xs'>just now</span>
      </div>
      <div className="message_contact msg_owner flex flex-col gap-2.5">
        <p className='p_text p_owner bg-white w-fit'>{message.text}</p>
        {message.img &&<img src={message.img} alt="" className='w-1/2' />}
      </div>
    </div>
  )
}

export default Message