import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="flex-1 p-6">
         <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home