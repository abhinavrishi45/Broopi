import React from 'react'
import logo from '../assets/broopi_logo_footer.png'
import twitter from '../assets/twitter.svg'
import insta from '../assets/insta.svg'
import linkedin from '../assets/linkedin.svg'
import fb from '../assets/fb.svg'
import Soon from '../assets/commingsoon.jpg'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-pink-50 px-6 py-10">
      {/* Logo */}
      <div className="flex justify-center md:justify-start">
        <img className="w-40 md:w-60" src={logo} alt="logo" />
      </div>

      {/* Links Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* Company */}
        <div>
          <p className="text-lg font-sans font-bold">Company</p>
          <div className="text-gray-500 mt-3 flex flex-col gap-2 cursor-pointer">
            <p onClick={() => navigate('/aboutus')}>About us</p>
            <p>FAQ</p>
            <p>Terms & Condition</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* For Customer */}
        <div>
          <p className="text-lg font-sans font-bold">For Customer</p>
          <div className="text-gray-500 mt-3 flex flex-col gap-2 cursor-pointer">
            <p>Blogs</p>
            <p>Contact us</p>
          </div>
        </div>

        {/* For Partners */}
        <div>
          <p className="text-lg font-sans font-bold">For Partners</p>
          <div className="text-gray-500 mt-3 flex flex-col gap-2 cursor-pointer">
            <p>Register as Professional</p>
            <p>Terms & Condition</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <p className="text-lg font-sans font-bold">Social Links</p>
          <div className="flex justify-center md:justify-start gap-5 mt-3">
            {[twitter, fb, insta, linkedin].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
              >
                <img className="w-full h-full object-cover" src={icon} alt="social" />
              </div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
            <img className="w-8 h-8 rounded-full" src={Soon} alt="coming soon" />
            <p className="text-lg font-bold">Coming Soon On</p>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="mt-10 text-center md:text-left text-sm text-gray-600">
        © Copyright 2024 Broopi Private Limited. All rights reserved. | CIN:
        U52241KA2023PTC175308
      </p>
    </div>
  )
}

export default Footer
