import React, { useContext, useState } from 'react'
import './search.css'
import { collection, doc, query, 
  setDoc, updateDoc, where, serverTimestamp, getDocs, getDoc, 
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { FaSearch } from 'react-icons/fa'

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {

    const q = query(
      collection(db, "users"), 
      where("displayName", "==", username)
    );

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch(err) {
      setErr(true)
    }
    
  }

  const searchHandler = () => {
    handleSearch();
  }

  const handleSelect = async () => {
    //check whether the group (chats in firestore) exists, if not create
    const combineId = 
      currentUser.uid > user.uid 
        ? currentUser.uid + user.uid 
        : user.uid + currentUser.uid;

    try {

      const res = await getDoc(doc(db, "chats", combineId));

      if(!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineId+".date"]: serverTimestamp()
        });
      }
    } catch(err) {

    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className='search_container'>
      <div className="search_form flex items-center">
        <input onChange={e => setUsername(e.target.value)} type="text" placeholder='Find a user'
          className='w-full border-none outline-none
          text-lg text-[#ddddf7] bg-transparent p-2' value={username}
        />
        <FaSearch onClick={searchHandler} className='text-[#ddddf7] text-2xl mr-1 font-bold cursor-pointer md:mr-4 lg:mr-4' />
      </div>
      {err && <span className='text-red-500 pl-2'>User not found!</span>}
      {user &&<div className="user_chat hover:bg-[#2f2d52] cursor-pointer pt-2 pl-2 pb-2 flex gap-2" onClick={handleSelect}>
        <img src={user.photoURL} alt="" className='w-8 h-8 rounded-full' />
        <div className="userChat_info">
          <span className='text-[#ddddf7]'>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search