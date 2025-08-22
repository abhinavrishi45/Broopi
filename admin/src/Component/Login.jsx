import React from 'react'
import logo from '../assets/newlastlogo.png'
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../ContextAuth'
const Login = () => {
  const {setUser} = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    setUser({name: 'Abhinav', email: 'johndoe@example.com'});
    navigate('/home');
  };
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='border rounded flex flex-col p-18'>
        <img className='h-12' src={logo} alt="" />
      <p className='text-center font-bold text-2xl mt-8'>Admin Login</p>
      <input type="text" placeholder="Email" className='border rounded p-3 mt-10 '/>
      <input type="password"
      placeholder='Password'
      className='border rounded p-3 mt-5'/>
      <button onClick={handleLogin} className='border rounded bg-purple-300 cursor-pointer mt-8 p-2 hover:bg-blue-200'>Login</button>
    </div>
    </div>
  )
}

export default Login