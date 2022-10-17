import React, { useState } from 'react'
import Img1 from '../img/img1.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom'
import './register.css'

const Register = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true)
        }, 
        
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            }); 

            await setDoc(doc(db, "userChats", res.user.uid), {
              
            });
            navigate("/");

          });

        } 
      );

      
      
    } catch(err) {
      setErr(true);
      alert(err)
    }
    
  };

  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
      <div className="regiter_container py-6 px-2 flex flex-col w-11/12 md:w-8/12 md:p-10 lg:w-4/12 lg:p-10">
        <span className="logo text-center">Ola_Dev Chat</span>
        <span className="title text-center">Register</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='Enter your name' className='sign_input'/>
          <input type="text" placeholder='email'className='sign_input'/>
          <input type="password" placeholder='password' className='sign_input'/>
          <input style={{display:"none"}} type="file" id='file' />
          <label htmlFor="file" className='text-[#a7bcff] flex items-center mt-2 gap-2'>
            <img src={Img1} alt="" className='w-6 h-6 cursor-pointer'/>
            <p>Add image</p>
          </label>
          <button className="btn mt-2">
            <span>Sign up</span>
          </button>
          {err && <span className='text-red-500'>Something went wrong</span>}
        </form>
        <p className="text-center text-[#5d5b8d] mt-5">You do have an account? <Link className='text-blue-500' to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register