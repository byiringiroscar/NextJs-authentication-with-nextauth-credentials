'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

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
      const res: any = await signIn("credentials", { 
        email: info.email,
        password: info.password,
        redirect: false,
       });

       if(res.error){
          setError('Invalid Credentials.')
          setPending(false)
          return
       }
        setPending(false);
        const form = e.target;
        form.reset();
        router.replace('/dashboard')


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
            <button className='border border-gray-400 p-2' disabled={pending ? true : false}>{ pending ? "loading..." : "Login" }</button>
             {error && <span className='text-[red]'>{error}</span>}
            </form>
        </div>
    </div>
  )
}

export default Login