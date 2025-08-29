import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import Electrician from './Component/service/Electrician';
import Aboutus from './Component/footer/Aboutus';

// import Address from './Component/pages/Address';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [lastPath, setLastPath] = useState(null);

  const navigate = useNavigate();
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
  const handelOpenLogin = () => {
    setLastPath(window.location.pathname);
    setShowLogin(true);
  }


  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);

    if (lastPath) {
      navigate(lastPath);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogin(false);
  };



  return (
    <>
      <Navbar
        user={user}
        // onLoginClick={() => setShowLogin(true)}
        onLoginClick={handelOpenLogin}
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
          <Route path="/service/PestControlling" element={<PestControling user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/service/ACService" element={<Ac user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/service/BathroomCleaning" element={<Bathroom user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/service/HomeCleaning" element={<Homecleaning user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/service/Plumber" element={<Plumber user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/service/Electrician" element={<Electrician user={user} onLoginClick={handelOpenLogin} />} />
          <Route path="/userprofile" element={<Myprofile />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/location" element={<GetLocation />} />
          {/* <Route path="/address" element={<Address />} /> */}

          <Route path='/aboutus' element={<Aboutus />} />
        </Routes>
      </div>
    </>
  );
};

export default App;


