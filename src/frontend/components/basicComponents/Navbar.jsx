import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-screen h-[12vh] bg-white flex justify-center items-center flex-col '>
            <Link to={"/home"}>
            <h1 className='text-2xl font-serif font-bold' >Khatabook</h1>
            <p className='text-xs'>We check every khatas here.</p>
            </Link>
    </div>
  )
}

export default Navbar