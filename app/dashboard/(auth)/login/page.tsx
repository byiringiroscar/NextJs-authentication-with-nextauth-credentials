import React from 'react'

const Login = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-1/3'>
            <h1 className='text-4xl font-bold mb-6'>Login</h1>
            <form className='flex flex-col'>
            <input className='border border-gray-400 mb-2 p-2' type='text' placeholder='Email' />
            <input className='border border-gray-400 mb-2 p-2' type='password' placeholder='Password' />
            <button className='border border-gray-400 p-2'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login