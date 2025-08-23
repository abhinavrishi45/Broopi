import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import axios from './utils/axios';
import Hero from './Component/Hero';
import ServiceHero from './Component/ServiceHero';
import Cart from './Component/pages/Cart';
import Userprofile from './Component/pages/Userprofile';
import PestControling from './Component/service/PestControling';
import Ac from './Component/service/Ac';
import Bathroom from './Component/service/Bathroom';
import Homecleaning from './Component/service/Homecleaning';
import Plumber from './Component/service/Plumber';
import Checkout from './Component/pages/Checkout';
import Myprofile from './Component/pages/Myprofile';
import HelpCenter from './Component/pages/HelpCenter';
import GetLocation from './Component/pages/GetLocation';
// import Address from './Component/pages/Address';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me', { withCredentials: true });
        if (res.data) {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      } catch {
        console.log('No active session');
        setUser(null);
        localStorage.removeItem('user');
      }
    };
    fetchUser();
  }, []);


  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Navbar
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}

      />
      {showLogin && !user && (
        <Userprofile onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      )}

      <div className={showLogin ? 'blur-sm pointer-events-none' : ''}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<ServiceHero />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/service/pestcontroling" element={<PestControling />} />
          <Route path="/service/Ac" element={<Ac />} />
          <Route path="/service/Bathroom" element={<Bathroom />} />
          <Route path="/service/Homecleaning" element={<Homecleaning />} />
          <Route path="/service/Plumber" element={<Plumber />} />
          <Route path="/userprofile" element={<Myprofile />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/location" element={<GetLocation />} />
          {/* <Route path="/address" element={<Address />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;


