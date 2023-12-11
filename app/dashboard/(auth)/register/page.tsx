'use client'
import React, { useState } from 'react'

const Register = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleInput = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(info)

  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-1/3'>
            <h1 className='text-4xl font-bold mb-6'>Register</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
            <input className='border border-gray-400 mb-2 p-2' name='username' type='text' placeholder='Username' onChange={(e) => handleInput(e)} />
            <input className='border border-gray-400 mb-2 p-2' type='email' name='email' placeholder='Email' onChange={(e) => handleInput(e)} />
            <input className='border border-gray-400 mb-2 p-2' type='password' name='password' placeholder='Password' onChange={(e) => handleInput(e)} />
            <button className='border border-gray-400 p-2'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register