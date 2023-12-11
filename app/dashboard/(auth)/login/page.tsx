'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [info, setInfo] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const handleInput = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!info.email || !info.password){
      setError("Please fill in all fields")
    }
    try{
      setPending(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })
      if(res.ok){
        setPending(false);
        const form = e.target;
        form.reset();
        router.push('/dashboard/login')
      }
      else{
        const errorData = await res.json()
        setError(errorData.message)
        setPending(false)
      }

    }
    catch(err){
      setPending(false)
      setError('something went wrong')
    }

  }
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-1/3'>
            <h1 className='text-4xl font-bold mb-6'>Login</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
            <input className='border border-gray-400 mb-2 p-2' name='email' type='text' placeholder='Email' onChange={(e) => handleInput(e)} />
            <input className='border border-gray-400 mb-2 p-2' name='password' type='password' placeholder='Password' onChange={(e) => handleInput(e)} />
            <button className='border border-gray-400 p-2'>{ pending ? "loading..." : "Login" }</button>
             {error && <span className='text-[red]'>{error}</span>}
            </form>
        </div>
    </div>
  )
}

export default Login