import React from 'react'
import logo from '../assets/newlastlogo.png'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-row'>
    <p className='bg-gray-100 font-serif px-7 py-5 text-xl font-semibold text-center'>DASHBOARD</p>
    <div className='flex flex-row items-center bg-gray-100 p-3 text-xl font-semibold w-full '>
     
      <img className="h-10 ml-10 cursor-pointer " src={logo} alt="" onClick={()=> navigate('/home')}/>
      {/* <p className="ml-10 hover:text-2xl hover:text-purple-600 cursor-pointer " onClick={() => navigate('/home')}>Home</p> */}
      <div className='flex gap-5 ml-auto mr-10 '>
        <p className='hover:text-2xl hover:text-purple-600 cursor-pointer '>Complaints</p>
        <p className='hover:text-2xl hover:text-purple-600 cursor-pointer '>Search</p>
        <p className='hover:text-2xl hover:text-purple-600 cursor-pointer '>Toggle</p>
        <p className='hover:text-2xl hover:text-purple-600 cursor-pointer '>Profile-icon</p>
      </div>

    </div>
    </div>

  )
}

export default Navbar