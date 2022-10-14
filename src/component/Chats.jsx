import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [ chats, setChats ] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);


  useEffect(() => {
    const getchats = () =>  {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
  
      return () => {
        unsub();
      };
    };

    currentUser.uid && getchats()
  }, [currentUser.uid]); 

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u });
  };
  
  return (
    <div className='chats overflow-scroll'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat=>(
        <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} className='userChat hover:bg-[#2f2d52] cursor-pointer chats_items flex items-center p-2 gap-2'>
          <img src={chat[1].userInfo.photoURL} alt="" className='w-10 h-10 rounded-full object-cover'/>
          <div className="chats_name">
            <span className="chats_user text-[#ddddf7] text-xl">{chat[1].userInfo.displayName}</span>
            <p className="chats_msg text-[#ddddf7] text-sm">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Chats