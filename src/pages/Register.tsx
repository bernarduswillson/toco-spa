import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';

interface userData {
  username: string
  email: string
  password: string
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get('token');

  // Token validation
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Toco Artwork
  const tucoBg = {
    backgroundImage: 'url("/images/tuco-artwork.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  // Form values
  const [formData, setFormData] = useState<userData>({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Register
  const registerData = async (data: userData): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:5000/auth/register', data);

      if (response.status === 200 && response.data.message === "Register success") {
        navigate('/login');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleRegister = (): void => {
    void registerData(formData);
  };

  return (
    <div className='h-screen relative'>
      <div className='flex h-full'>
        <div className='w-0 lg:w-1/2' style={tucoBg}>
        </div>
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
          <div className='w-[65%]'>
            <div className='flex justify-center'>
              <img src='/images/logo.svg' width={90} height={90} alt='logo' />
            </div>
            <div className='text-blue-orange-gradient Poppins700 text-[50px] text-center mb-[50px]'>
              Register
            </div>
            <label className='text-orange Poppins800 text-[18px]'>
              Email
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]  mb-[40px]'
              placeholder='Your email'
              style={{ boxShadow: 'none' }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Username
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]  mb-[40px]'
              placeholder='Your username'
              style={{ boxShadow: 'none' }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Password
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]  mb-[40px]'
              placeholder='Your password'
              style={{ boxShadow: 'none' }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Confirm Password
            </label>
            <input
              type='password'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue] '
              placeholder='Confirm your password'
              style={{ boxShadow: 'none' }}
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
                    onClick={handleRegister}
                    className='Poppins300 text-[20px] custom-button w-[250px] text-center transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:opacity-60 active:translate-y-[3px]'
                  >
                    Register
                  </button>
                )}
            </div>
            <div className='Poppins300 text-center text-grey underline'>
              <Link to='/login'>
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
