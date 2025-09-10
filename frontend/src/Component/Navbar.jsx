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
import searchcat from '../assets/assets1.png';

const Navbar = ({ onLoginClick, user }) => {
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
  const [results, setResults] = useState([]);

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
    } else {
      setShowProfile(true);
    }
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
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
        }
      );
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
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category");
        setCategories(res.data.reverse());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/product/allproducts')
  //     .then((res) => {
  //       console.log('Categories API:', res.data); 
  //       const cate = res.data.map((p) =>
  //         typeof p.category === 'object' ? p.category.name : p.category
  //       );
  //       setCategories([...new Set(cate)]); 
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (search.trim() === '') {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(
          'http://localhost:5000/api/product/search',
          {
            params: { query: search },
          }
        );
        console.log('Search API:', res.data);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <nav className="bg-white-600 p-5 flex gap-6 flex-col sm:flex-row items-center shadow-md ">
        <div className="ml-20">
          <img
            onClick={() => navigate('/')}
            className="w-50 cursor-pointer"
            src={newlastlogo}
            alt="logo"
          />
        </div>
        <form className="ml-20 flex items-center border border-gray-200 rounded-xl w-full sm:w-auto cursor-pointer">
          <img className="ml-3 w-6 h-6" src={locat} alt="" />
          <input
            type="text"
            placeholder="Location"
            readOnly
            onClick={() => SetLocationpopup(true)}
            className="p-2 rounded-l-md w-full py-3 sm:w-64 outline-none "
          />
          <img className="w-11 h-6 px-2" src={downarrow} alt="" />
        </form>

        <div className="relative w-full sm:w-auto">
          <div className="flex items-center border border-gray-200 rounded-xl w-full sm:w-auto">
            <img className="ml-3 w-6 h-6" src={searchicon} alt="search" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchdown(true)}
              onBlur={() => setTimeout(() => setSearchdown(false), 150)}
              className="p-2 rounded-l-md w-full py-3 sm:w-64 outline-none"
            />
          </div>

          {searchdown && (
            <div className="absolute top-full left-0 mt-1 w-full sm:w-73 border border-gray-200 py-2 rounded-xl bg-white shadow-lg z-10 max-h-64 overflow-y-auto">
              {categories.length > 0 && (
                <>
                  <h3 className="px-3 text-gray-600 text-sm">Categories</h3>
                  {/* {categories.map((cat, i) => (
                    <div
                      key={i}
                      onMouseDown={() =>
                        navigate(`/service/${typeof cat === 'object' ? cat.name : cat}`)
                      }
                      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-purple-100"
                    >
                      <img src={searchcat} alt="" className="w-8 h-6" />
                      <span>{typeof cat === 'object' ? cat.name : cat}</span>
                    </div>
                  ))} */}
                  {categories.map((cat, i) => (
                    <div
                      key={i}
                      onMouseDown={() =>
                        navigate(cat.link)
                      }
                      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-purple-100"
                    >
                      <img src={searchcat} alt="" className="w-8 h-6" />
                      <span>{typeof cat === 'object' ? cat.name : cat}</span>
                    </div>
                  ))}
                </>
              )}

              {results.length > 0 && (
                <>
                  <h3 className="px-3 text-gray-600 text-sm mt-2">Products</h3>
                  {results.map((prod) => (
                    <div
                      key={prod._id}
                      onMouseDown={() => navigate(`/product/${prod._id}`)}
                      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-purple-100"
                    >
                      <img
                        src={`http://localhost:5000/uploads/${prod.image}`}
                        alt={prod.name?.name || prod.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span>{prod.name?.name || prod.name}</span>
                    </div>
                  ))}
                </>
              )}

              {results.length === 0 && search.trim() !== '' && (
                <p className="px-3 text-gray-500 text-sm">No results found</p>
              )}
            </div>
          )}
        </div>
        <img
          onClick={() => navigate('/cart')}
          className="w-8 ml-40 cursor-pointer"
          src={cartimg}
          alt="cart"
        />

        <div className="relative">
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
          <div className="bg-white p-10 rounded-2xl shadow-lg w-140 relative ">
            <img
              className="w-5 h-5 right-5 top-5 absolute cursor-pointer"
              src={closeicon}
              alt=""
              onClick={() => SetLocationpopup(false)}
            />
            <input
              type="text"
              ref={autocompleteRef}
              placeholder="Search your Location/Society/Appartment"
              className="w-full border mt-4 border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            />

            <button className="mt-5 flex items-center gap-2 text-purple-600 hover:underline">
              <IoLocationOutline className="text-purple-600 text-xl " />
              <p
                onClick={handleSave}
                className="font-semibold cursor-pointer"
              >
                Use current location
              </p>
            </button>
            <div>
              <p className="bg-gray-100 p-1 mt-4"></p>
              <p className="flex justify-center text-center mt-25 mb-25">
                POWERED BY GOOGLE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
