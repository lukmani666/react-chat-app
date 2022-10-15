import React, { useContext, useState } from 'react'
import { MdOutlineAttachFile } from 'react-icons/md'
import { FiImage } from 'react-icons/fi'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    if(img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //setErr(true);
        }, 
        
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });

        } 
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("")
    setImg(null)
  };

  return (
    <div className='input'>
      <div className="input_msg h-12 bg-white p-2.5 flex items-center justify-between">
        <input onChange={e=>setText(e.target.value)} type="text" placeholder='Type your message' className='input_msg w-full border-none outline-none
          text-lg text-[#2f2d52]' value={text}
        />
        <div className="send flex items-center gap-2">
          <MdOutlineAttachFile className='text-xl' />
          <input onChange={e=>setImg(e.target.files[0])} type="file" style={{ display: "none" }} id='file'/>
          <label htmlFor="file">
            <FiImage  className='text-xl' />
          </label>
          <button onClick={handleSend} className='bg-[#5d5b8d] text-sm text-[#ddddf7] p-1 rounded'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Input