import React from 'react'
import logo from '../assets/broopi_logo_footer.png'
import twitter from '../assets/twitter.svg'
import insta from '../assets/insta.svg'
import linkedin from '../assets/linkedin.svg'
import fb from '../assets/fb.svg'
import Soon from '../assets/commingsoon.jpg'

const Footer = () => {
  return (
    <div className='bg-pink-50 h-100'>
      <img className='w-60 py-10 ml-15' src={logo} alt="" />
      <div className='flex flex-row ml-20 mr-15 gap-60 mt-2 '>
        <div className="flexflex-col ">
          <p className='text-lg font-sans font-bold'>Company</p>
          <div className='text-gray-500 mt-3 flex flex-col gap-1  cursor-pointer'>
            <p>About us</p>
            <p>FAQ</p>
            <p>Terms & Condition</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div>
          <p className='text-lg font-sans font-bold'>For Customer</p>
          <div className='text-gray-500 mt-3 flex flex-col gap-1 cursor-pointer'>
            <p>Blogs</p>
            <p>Contact us</p>
          </div>
        </div>
        <div>
          <p className='text-lg font-sans font-bold'>For Partners</p>
          <div className='text-gray-500 mt-3 flex flex-col gap-1  cursor-pointer'>
            <p>Register as Professional</p>
            <p>Terms & Condition</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div>
          <p className='text-lg font-sans font-bold'>Social Links</p>
          <div className='flex flex-row gap-5 mt-3 '>
            <div className='w-10 h-10 rounded-full overflow-hidden border-4 border-white hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer shadow-lg'>
              <img className='w-full h-full object-cover' src={twitter} alt="" />
            </div>
            <div className='w-10 h-10 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer'>
              <img className='w-full h-full object-cover' src={fb} alt="" />
            </div>
            <div className='w-10 h-10 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer'>
              <img className='w-full h-full object-cover' src={insta} alt="" />
            </div><div className='w-10 h-10 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer'>
              <img className='w-full h-full object-cover' src={linkedin} alt="" />
            </div>

          </div>
          <div className='flex flex-row mt-2'>
            <img className='w-8 h-8  rounded-full' src={Soon} alt="" />
            <p className='font-2 text-xl font-bold ml-1'>Comming Soon On</p>
          </div>
        </div>
      </div>
      <p className='mt-18 ml-120' >© Copyright 2024 Broopi Private Limited. All rights reserved. | CIN: U52241KA2023PTC175308</p>

    </div>
  )
}

export default Footer