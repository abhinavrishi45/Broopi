import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import newlastlogo from '../assets/newlastlogo.png';
import searchicon from '../assets/searchicon.jpg';
import locat from '../assets/locat.png';
import cartimg from '../assets/cartimg.png';
import profileicon from '../assets/profileicon.svg';
import downarrow from '../assets/down-arrow.jpg';
import axios from 'axios';
import closeicon from '../assets/close_icon.svg';
import { IoLocationOutline } from 'react-icons/io5';
import Userprofile from './pages/Userprofile';
import searchcat from '../assets/assets1.png'


const Navbar = ({ onLoginClick, user }) => {
  // const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [locationpopup, SetLocationpopup] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState('');
  const [society, setSociety] = useState('');
  const autocompleteRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [searchdown, setSearchdown] = useState(false);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) setUser(JSON.parse(storedUser));
  // }, []);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleIconClick = () => {
    if (!user) {
      onLoginClick();
    }
    else {
      setShowProfile(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', search);
  };

  const handleSave = async () => {
    await axios.post('http://localhost:5000/api/location/save', {
      latitude: coords.lat,
      longitude: coords.lng,
      address,
      society,
      userId: user?._id,
    });
    SetLocationpopup(false);
  };

  useEffect(() => {
    if (locationpopup && window.google && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' },
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const formatted = place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setAddress(formatted);
        setCoords({ lat, lng });
        setSociety(formatted);
      });
    }
  }, [locationpopup]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/product/allproducts/onepercategory")
      .then((res) => {
        const cate = res.data.map((p) => p.category);
        setCategories(cate);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <nav className="bg-white-600 p-4 flex gap-6 flex-col sm:flex-row items-center shadow-md ">

        <div className="ml-20">
          <img onClick={() => navigate('/')} className="w-50 cursor-pointer" src={newlastlogo} alt="" />
        </div>

        <form className="ml-20 flex items-center border border-gray-200 rounded-xl w-full sm:w-auto cursor-pointer">
          <img className='ml-3 w-6 h-6' src={locat} alt="" />
          <input
            type="text"
            placeholder="Location"
            readOnly
            onClick={() => SetLocationpopup(true)}
            className="p-2 rounded-l-md w-full py-3 sm:w-64 outline-none "
          />
          <img className="w-11 h-6 px-2" src={downarrow} alt="" />
        </form>

        {/* <form onSubmit={handleSearch} className="flex items-center border rounded-xl w-full sm:w-auto">
          <img className='ml-3 w-6 h-6' src={searchicon} alt="" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchdown(true)}
            onBlur={() => setTimeout(() => setSearchdown(false), 150)}
            className="p-2 rounded-l-md w-full py-3 sm:w-64 outline-none"
          />
          {searchdown && categories.length > 0 && (
            <div className="relative flex flex-col items-center border rounded-xl w-full sm:w-auto">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                  className="flex items-center gap-2 p-3 cursor-pointer hover:bg-purple-100"
                >
                  <img src={searchicon} alt="" className="w-4 h-4" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          )}
        </form> */}
        <div className="relative w-full sm:w-auto">
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-200 rounded-xl w-full sm:w-auto"
          >
            <img className="ml-3 w-6 h-6" src={searchicon} alt="" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchdown(true)}
              onBlur={() => setTimeout(() => setSearchdown(false), 150)}
              className="p-2 rounded-l-md w-full py-3 sm:w-64 outline-none"
            />
          </form>

          {searchdown && categories.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full sm:w-64 border border-gray-200 py-5 rounded-xl bg-white shadow-lg z-10">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/service/${cat}`)}
                  className="flex items-center gap-2 p-3 cursor-pointer hover:bg-purple-100 border border-gray-200 mt-2 ml-5 rounded mr-5"                >
                  <img src={searchcat} alt="" className="w-8 h-6" />
                  <span className='ml-2'>{cat}</span>
                </div>
              ))}
            </div>
          )}
        </div>


        <img
          onClick={() => navigate('/cart')}
          className="w-8 ml-40 cursor-pointer"
          src={cartimg}
          alt="cart"
        />
        <div className="relative" >
          <img
            src={profileicon}
            alt="User"
            className="w-8 h-8 cursor-pointer"
            onClick={handleIconClick}
          />
        </div>


      </nav>
      {showProfile && <Userprofile onClose={() => setShowProfile(false)} />}
      {locationpopup && (
        <div className="fixed inset-0 backdrop-blur bg-black/50 bg-opacity-20 flex z-40 justify-center items-center">
          <div className="bg-white p-10 rounded-2xl  shadow-lg w-140 relative ">

            <img className='w-5 h-5 right-5 top-5 absolute cursor-pointer' src={closeicon} alt=""
              onClick={() => SetLocationpopup(false)} />
            <input
              type="text"
              ref={autocompleteRef}
              placeholder="Search your Location/Society/Appartment"
              className="w-full border mt-4 border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            />

            <button className="mt-5 flex items-center gap-2 text-purple-600 hover:underline">
              <IoLocationOutline className="text-purple-600 text-xl " />
              <p onClick={handleSave} className='font-semibold cursor-pointer'> Use current location</p>
            </button>
            <div>
              <p className='bg-gray-100 p-1 mt-4'></p>
              <p className='flex justify-center text-center mt-25 mb-25'>POWERED BY GOOGLE</p>
            </div>
          </div>

        </div>
      )}
    </>

  );
};
export default Navbar;

