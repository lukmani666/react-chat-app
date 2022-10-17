import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import './login.css'


const Login = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      
    } catch(err) {
      setErr(true);
      alert(err)
    }
    
  };

  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
      <div className="bg-[#fff] px-2 py-10 rounded-2xl flex flex-col h-fit 
        w-11/12 md:w-8/12 md:p-10 h-fit lg:w-4/12 lg:h-fit lg:p-10">
        <span className="logo text-center">Ola_Dev Chat</span>
        <span className="title text-center">Login</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='email' className='sign_input mt-2'/>
          <input type="password" placeholder='password' className='sign_input mt-2'/>
          <button className="btn mt-4">
          <span>Sign in</span>
          </button>
          {err && <span className='text-red-500'>Something went wrong</span>}
        </form>
        <p className="text-center text-[#5d5b8d] mt-5">You don't have an account? <Link className='text-blue-500' to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login