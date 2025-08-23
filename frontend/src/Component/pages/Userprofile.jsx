import React, { useEffect, useState } from 'react';
import Google from "../../assets/google-last.png";
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const Userprofile = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleprofileClick = () => {
    onClose();
    navigate('/userprofile');
  };
  const handlehelpClick = () => {
    onClose();
    navigate('/helpcenter');
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get('/auth/me');
  //       setUser(res.data);
  //     } catch {
  //       console.error("Not logged in");
  //     } finally {
  //       setLoadingMe(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me', { withCredentials: true });
        setUser(res.data); // ✅ make sure this matches your backend response
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch {
        console.error("Not logged in");
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoadingMe(false);
      }
    };
    fetchUser();
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await axios.post('/auth/login', {
        email: loginEmail,
        password: loginPassword
      }, {
        withCredentials: true
      });
      // localStorage.setItem('user', JSON.stringify(data.user || {}));
      // const data = res.data;
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user))
      onClose?.();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };


  const handleSignup = async () => {
    setError('');
    try {
      const res = await axios.post('/auth/register', {
        name: fullName,
        email: signupEmail,
        password: signupPassword
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center font-serif justify-center">
      <div className="bg-white rounded-lg p-8 md:p-10 max-w-md w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-5 right-7 text-3xl text-gray-600 hover:text-black"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          {user ? 'Welcome ' + `${user.name}` : (isSignup ? 'Sign Up' : 'Login')}
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        {!loadingMe && user && (
          <div className="flex flex-col  gap-4 m-3">
            {/* <UserIcon name={user.name} email={user.email} picture={user.picture} size={56} /> */}
            <div className="text-center">

              <button onClick={handleprofileClick} className="block  py-2 mt-3 w-full cursor-pointer text-purple border rounded hover:bg-purple-300 hover:text-white ">🙍‍♂️ My Profile</button>

              <button onClick={handlehelpClick} className="block py-2 mt-3 cursor-pointer w-full text-purple border rounded hover:bg-purple-300 hover:text-white ">📜 Help Center</button>

              <button
                onClick={handleLogout}
                className="block w-full py-2 mt-20 cursor-pointer text-purple border rounded hover:bg-purple-300 hover:text-white "
              >
                🔓 Logout
              </button>
            </div>
          </div>
          // </div>

        )}

        {!loadingMe && !user && (
          <>
            {!isSignup ? (
              <>
                <input
                  type="email"
                  placeholder="e.g: broopi@gmail.com"
                  className="w-full px-4 py-2 border rounded-md mb-3"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-md mb-3"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  onClick={handleLogin}
                  className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold cursor-pointer hover:bg-purple-200 hover:text-purple-600 transition mt-2 mb-5"
                >
                  Login
                </button>
                <div className="text-center font-semibold mb-3">----------- OR -----------</div>
                {/*                
                <h3 className="flex text-md text-xl justify-center items-center font-bold mb-2 mt-6">
                  Enter your phone number
                </h3> */}
                <input
                  type="text"
                  placeholder="Enter your Number:"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                />
                <button className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold mt-3 cursor-pointer hover:bg-purple-200 hover:text-purple-600 transition">
                  Proceed
                </button>
                <div className="flex flex-col items-center gap-3">
                  <img className="h-10  mt-5 w-auto cursor-pointer" onClick={handleGoogleSignIn} src={Google} alt="Google" />

                </div>

              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border rounded-md mb-3"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md mb-3"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  onClick={handleSignup}
                  className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-200 hover:text-purple-600 cursor-pointer transition"
                >
                  Sign Up
                </button>
                <div className="text-center mt-5 font-semibold mb-3">----------- OR -----------</div>
                <div className='mt-2 flex flex-col items-center gap-3'>
                  <img className='h-10 w-auto cursor-pointer' onClick={handleGoogleSignIn} src={Google} alt="Google" />

                </div>
              </>
            )}
            <p className="text-sm text-semibold text-center mt-5">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setError('');
                  setIsSignup(!isSignup);
                }}
                className="text-purple-500 hover:underline cursor-pointer font-semibold"
              >
                {isSignup ? 'Login' : 'Sign up'}
              </button>
            </p>
            <p className="mt-4 text-sm">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">T&amp;C</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy policy</a>
            </p>
          </>
        )}

        {loadingMe && (
          <p className="text-center text-gray-600">Checking your session…</p>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
