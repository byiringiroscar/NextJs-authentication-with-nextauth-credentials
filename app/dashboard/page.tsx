'use client'
import React from 'react'
import { signOut } from 'next-auth/react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Dashboard