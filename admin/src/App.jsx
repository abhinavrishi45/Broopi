import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './ContextAuth';
import Contact from './Pages/Contact'
import Invoice from './Pages/Invoice'
import Calender from './Pages/Calender'
import UserProfile from './Pages/UserProfile'
import AccountSetting from './Pages/Account'
import OtherPages from './Pages/OtherPages'
import Authentication from './Pages/Authentication'
import Review from './Pages/Review'
import UI from './Pages/UI'
import HomeUi from './Pages/HomeUi'
import HomeCard from './Pages/HomeCard';
import Allproducts from './Pages/Allproducts';
import AboutUs from './Pages/AboutUs'
import FirstCard from './Pages/FirstCard';
import LongBanner from './Pages/LongBanner';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path='HomeCard' element={<HomeCard />} />
            <Route path='contact' element={<Contact />} />
            <Route path='invoice' element={<Invoice />} />
            <Route path='calender' element={<Calender />} />
            <Route path='user-profile' element={<UserProfile />} />
            <Route path='account-setting' element={<AccountSetting />} />
            <Route path='otherpages' element={<OtherPages />} />
            <Route path='authentication' element={<Authentication />} />
            <Route path='review' element={<Review />} />
            <Route path='ui' element={<UI />} />
            <Route path='homeui' element={<HomeUi />} />
            <Route path='firstCard' element={<FirstCard />} />
            <Route path='longBanner' element={<LongBanner />} />
            <Route path='all-products' element={<Allproducts />} />
            <Route path='aboutUs' element={<AboutUs />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
