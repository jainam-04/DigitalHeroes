import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4'>
      <h1 className='text-5xl font-bold'>Digital Heroes</h1>
      <Link to={'/login'} className='bg-blue-600 px-6 py-2 rounded'>Login</Link>
      <Link to={'/register'} className='bg-green-600 px-6 py-2 rounded'>Register</Link>
    </div>
  )
}

export default Home
