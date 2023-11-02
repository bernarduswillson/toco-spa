import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';

interface userData {
  name: string
  password: string
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get('token');

  // Token validation
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  
  // Tuco artwork
  const tucoBg = {
    backgroundImage: 'url("/images/tuco-artwork.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  // Form values
  const [formData, setFormData] = useState<userData>({
    name: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Login
  const loginData = async (data: userData): Promise<void> => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/auth/login', data);
      
      if (response.status === 200) {
        navigate('/');
        Cookie.set('token', response.data.token);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleLogin = (): void => {
    void loginData(formData);
  };

  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='w-0 lg:w-1/2' style={tucoBg}>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
          <div className='w-[65%]'>
            <div className='flex justify-center'>
              <img src='/icons/logo.svg' width={90} height={90} alt='logo' />
            </div>
            <div className='text-blue-orange-gradient Poppins700 text-[50px] text-center mb-[50px]'>
              Login
            </div>
            <label className='text-orange Poppins800 text-[18px]'>
              Username
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue] mb-[40px]'
              placeholder='Your username'
              style={{ boxShadow: 'none' }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Password
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]'
              placeholder='Your password'
              style={{ boxShadow: 'none' }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className='flex justify-center mt-[80px] mb-[30px]'>
              {loading
                ? (
                  <div className='Poppins300 text-[20px] distinct-button w-[250px] text-center opacity-60'>
                    Loading...
                  </div>
                )
                : (
                  <button
                    onClick={handleLogin}
                    className='Poppins300 text-[20px] custom-button text-center transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:opacity-60 active:translate-y-[3px]'>
                    Login
                  </button>
                )}
            </div>
            <div className='Poppins300 text-center text-grey underline'>
              <Link to='/register'>
                Dont have an account yet? Register here
              </Link>
            </div>
            <div className='Poppins300 text-center text-grey underline'>
              <Link to='/'>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
