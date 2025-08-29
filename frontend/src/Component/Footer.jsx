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
    <footer className="bg-pink-50 px-6 py-10 ">
      {/* Logo */}
      <div className="flex justify-center md:justify-start ml-10">
        <img className="w-32 sm:w-40 md:w-56" src={logo} alt="logo" />
      </div>

      {/* Footer Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left ml-10">
        
        {/* Company */}
        <div>
          <p className="text-lg font-sans font-bold">Company</p>
          <div className="text-gray-600 mt-3 flex flex-col gap-2 cursor-pointer">
            <p onClick={() => navigate('/aboutus')} className="hover:text-black">About us</p>
            <p className="hover:text-black">FAQ</p>
            <p className="hover:text-black">Terms & Condition</p>
            <p className="hover:text-black">Privacy Policy</p>
          </div>
        </div>

        {/* Customer */}
        <div>
          <p className="text-lg font-sans font-bold">For Customer</p>
          <div className="text-gray-600 mt-3 flex flex-col gap-2 cursor-pointer">
            <p className="hover:text-black">Blogs</p>
            <p className="hover:text-black">Contact us</p>
          </div>
        </div>

        {/* Partners */}
        <div>
          <p className="text-lg font-sans font-bold">For Partners</p>
          <div className="text-gray-600 mt-3 flex flex-col gap-2 cursor-pointer">
            <p className="hover:text-black">Register as Professional</p>
            <p className="hover:text-black">Terms & Condition</p>
            <p className="hover:text-black">Privacy Policy</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <p className="text-lg font-sans font-bold">Social Links</p>
          <div className="flex justify-center md:justify-start gap-4 mt-3 flex-wrap">
            {[twitter, fb, insta, linkedin].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
              >
                <img className="w-full h-full object-cover" src={icon} alt="social" />
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="flex justify-center md:justify-start items-center gap-2 mt-5">
            <img className="w-8 h-8 rounded-full" src={Soon} alt="coming soon" />
            <p className="text-base sm:text-lg font-bold">Coming Soon On</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="mt-10 text-center md:text-left text-xs sm:text-sm text-gray-600">
        © Copyright 2024 Broopi Private Limited. All rights reserved. | CIN:
        U52241KA2023PTC175308
      </p>
    </footer>
  )
}

export default Footer
