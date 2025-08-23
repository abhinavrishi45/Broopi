import React, { useState } from 'react';
import video from '../../assets/herovideo.mp4'
import cart from '../../assets/shopping-cart-cart.png'
import general from '../../assets/GeneralPestControl.png'
import termit from '../../assets/termitControl.png'
import star from '../../assets/star_white.svg'
import service from '../../assets/serviceone.png'

const Electrician = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div className='flex flex-row'>
      <div className=' border border-gray-200 mt-10 ml-25 rounded py-5 px-7 w-260'>
        <div >
          <video src={video}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl mt-3 ml-1 mb-8" />
        </div>
        <h className='text-3xl font-bold font-serif '>PEST CONTROLLING</h>
        <div className='flex flex-row mt-5 gap-2'>
          <div className='h-7 w-12  rounded flex items-center bg-green-800'>
            <img className='h-5 w-5  rounded mx-auto' src={star} alt="" />
            <p className='text-white mr-2 font-bold'>0</p>
          </div>
          <p className='text-xl font-bold text-gray-500 '>0 reviews</p>
        </div>
        <p className='text-3xl mt-5 font-serif font-bold'>General Pest Control</p>
        <div>
          {activeMenu === 'pest' && (
            <div>
              <div className="mt-5 bg-white shadow-md border border-gray-100 rounded w-245 z-50">
                <div className="py-2">
                  <div className='flex ml-4'>
                    <div className="px-4 py-1 font-bold text-2xl">Apartment Pest control 1 BHK
                      <div className='flex flex-row items-center mt-2'>
                        <img className='bg-purple-800 h-3 w-3 rounded' src={star} alt="" />
                        <p className='ml-1 text-sm text-gray-500 '>(0)0 reviews</p>
                      </div>
                      <div className='flex text-sm flex-row mt-1'>
                        <p className='font-bold '>₹1099</p>
                        <p className='ml-3 line-through'>₹1899</p>
                        <p className='ml-5 font-semibold'>• 3hr</p>
                      </div>
                      <div className='mt-4 mb-4'>
                        <ul className='list-disc ml-4 text-gray-600'>
                          <li className='text-sm'>All kind of pest control experienced general pest team</li>
                          <li className='text-sm'>60Days warranty</li>
                        </ul>
                      </div>
                      <p className='text-purple-600 cursor-pointer text-sm mt-8 mb-5'>Show More</p>
                    </div>
                    <div className='flex flex-col items-center' >
                      <img className='h-40 w-40 rounded ml-80 mt-5' src={service} alt="" />
                      <button className=' border border-purple-300 rounded-2xl px-5 ml-80 mt-2 py-2 cursor-pointer text-purple-700 font-semibold hover:bg-purple-700 hover:text-white'>ADD</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-white shadow-md border border-gray-100 rounded w-245 z-50">
                <div className="py-2">
                  <div className='flex ml-4'>
                    <div className="px-4 py-1 font-bold text-2xl">Bungalow Pest Control
                      <div className='flex flex-row items-center mt-2'>
                        <img className='bg-purple-800 h-3 w-3 rounded' src={star} alt="" />
                        <p className='ml-1 text-sm text-gray-500 '>(0)0 reviews</p>
                      </div>
                      <div className='flex text-sm flex-row mt-1'>
                        <p className='font-bold '>₹2999</p>
                        <p className='ml-3 line-through'>₹3899</p>
                        <p className='ml-5 font-semibold'>• 3hr</p>
                      </div>
                      <div className='mt-4 mb-4'>
                        <ul className='list-disc ml-4 text-gray-600'>
                          <li className='text-sm'>All kind of pest control experienced general pest team</li>
                          <li className='text-sm'>60Days warranty</li>
                        </ul>
                      </div>
                      <p className='text-purple-600 cursor-pointer text-sm mt-8 mb-5'>Show More</p>
                    </div>
                    <div className='flex flex-col items-center' >
                      <img className='h-40 w-40 rounded ml-80 mt-5' src={service} alt="" />
                      <button className=' border border-purple-300 rounded-2xl px-5 ml-80 mt-2 py-2 cursor-pointer text-purple-700 font-semibold hover:bg-purple-700 hover:text-white'>ADD</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}

          {activeMenu === 'termite' && (
            <div>
              <div className="mt-5 bg-white shadow-md border border-gray-100 rounded w-245 z-50">
                <div className="py-2">
                  <div className='flex ml-4'>
                    <div className="px-4 py-1 font-bold text-2xl">Apartment Pest control 1 BHK
                      <div className='flex flex-row items-center mt-2'>
                        <img className='bg-purple-800 h-3 w-3 rounded' src={star} alt="" />
                        <p className='ml-1 text-sm text-gray-500 '>(0)0 reviews</p>
                      </div>
                      <div className='flex text-sm flex-row mt-1'>
                        <p className='font-bold '>₹1099</p>
                        <p className='ml-3 line-through'>₹1899</p>
                        <p className='ml-5 font-semibold'>• 3hr</p>
                      </div>
                      <div className='mt-4 mb-4'>
                        <ul className='list-disc ml-4 text-gray-600'>
                          <li className='text-sm'>All kind of pest control experienced general pest team</li>
                          <li className='text-sm'>60Days warranty</li>
                        </ul>
                      </div>
                      <p className='text-purple-600 cursor-pointer text-sm mt-8 mb-5'>Show More</p>
                    </div>
                    <div className='flex flex-col items-center' >
                      <img className='h-40 w-40 rounded ml-80 mt-5' src={service} alt="" />
                      <button className=' border border-purple-300 rounded-2xl px-5 ml-80 mt-2 py-2 cursor-pointer text-purple-700 font-semibold hover:bg-purple-700 hover:text-white'>ADD</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 bg-white shadow-md border border-gray-100 rounded w-245 z-50">
                <div className="py-2">
                  <div className='flex ml-4'>
                    <div className="px-4 py-1 font-bold text-2xl">Apartment Pest control 1 BHK
                      <div className='flex flex-row items-center mt-2'>
                        <img className='bg-purple-800 h-3 w-3 rounded' src={star} alt="" />
                        <p className='ml-1 text-sm text-gray-500 '>(0)0 reviews</p>
                      </div>
                      <div className='flex text-sm flex-row mt-1'>
                        <p className='font-bold '>₹1099</p>
                        <p className='ml-3 line-through'>₹1899</p>
                        <p className='ml-5 font-semibold'>• 3hr</p>
                      </div>
                      <div className='mt-4 mb-4'>
                        <ul className='list-disc ml-4 text-gray-600'>
                          <li className='text-sm'>All kind of pest control experienced general pest team</li>
                          <li className='text-sm'>60Days warranty</li>
                        </ul>
                      </div>
                      <p className='text-purple-600 cursor-pointer text-sm mt-8 mb-5'>Show More</p>
                    </div>
                    <div className='flex flex-col items-center' >
                      <img className='h-40 w-40 rounded ml-80 mt-5' src={service} alt="" />
                      <button className=' border border-purple-300 rounded-2xl px-5 ml-80 mt-2 py-2 cursor-pointer text-purple-700 font-semibold hover:bg-purple-700 hover:text-white'>ADD</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* right side */}
      <div className='fixed left-286 right-20 mx-auto rounded overflow-hidden z-50'>
        <div className='flex flex-col border border-gray-300 rounded-xl p-5 ml-4 mr-4 mt-10'>
          <p className='text-xl font-serif text-center'>Select A Service</p>
          <div className='flex flex-row mt-5 gap-5'>
            <div className='cursor-pointer'>
              <img onClick={() =>
                setActiveMenu(activeMenu === 'pest' ? null : 'pest')
              }
                className='h-20 w-20 rounded ' src={general} alt="" />
              <p className='text-sm font-serif'>Pest
                Control</p>
            </div>
            <div className='cursor-pointer'>
              <img onClick={() =>
                setActiveMenu(activeMenu === 'termite' ? null : 'termite')
              }
                className='h-20 w-20 rounded ' src={termit} alt="" />
              <p className='text-sm font-serif'>Termite Control</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col border border-gray-300 rounded-xl p-5 ml-4 mr-4 mt-10'>
          <p className='text-xl font-serif text-center'>No items in Your cart</p>
          <img className='h-20 w-20 mx-auto mt-3 ' src={cart} alt="" />

        </div>
      </div>
    </div>
  )
}

export default Electrician