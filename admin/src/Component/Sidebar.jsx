import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('');

  const menuItems = [
    { label: 'HomeCard', path: '/home/HomeCard' },
    { label: 'Contact', path: '/home/contact' },
    { label: 'Invoice', path: '/home/invoice' },
    { label: 'Calender', path: '/home/calender' },
    { label: 'User Profile', path: '/home/user-profile' },
    { label: 'Account Setting', path: '/home/account-setting' },
    { label: 'Other Pages', path: '/home/otherpages' },
    { label: 'Authentication', path: '/home/authentication' },
    { label: 'Reviews', path: '/home/review' },
    { label: 'UI', path: '/home/ui' },
    { label: 'All Products', path: '/home/all-products' },
    { label: 'First Card', path: '/home/FirstCard' },
    { label : 'Long Banner', path:'/home/longBanner'},
    { label: 'About Us', path: '/home/aboutUs' }
  ];

  return (
    <div className='border border-gray-50 flex flex-col w-50'>
      <div className='bg-gray-100 font-semibold px-4 py-3'>
        {menuItems.map((item) => (
          <p
            key={item.label}
            onClick={() => {
              setActive(item.label);
              navigate(item.path);
            }}
            className={`border border-gray-300 p-2 rounded-xl mt-1 cursor-pointer hover:bg-purple-100 hover:text-center transition-all
              ${active === item.label ? 'bg-purple-200 text-purple-900 text-center font-bold' : ''}
            `}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
