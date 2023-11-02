import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';

interface userData {
  username: string
  email: string
  password: string
  passwordConfirmation: string
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get('token');
  const [formData, setFormData] = useState<userData>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [emailError, setEmailError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>('');
  const [canRegister, setCanRegister] = useState(false);

  // Token validation
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Handle email validation
  useEffect(() => {
    const validateEmailOnInputChange = async () => {
      if (formData.email.length === 0) {
        setEmailError('');
        return;
      }

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(formData.email)) {
        try {
          const response = await axios.post('http://localhost:5000/auth/check-email', { email: formData.email });
          console.log(response);
          if (response.status === 200) {
            setEmailError('');
          } else {
            setEmailError(response.data.message);
          }
        } catch (error) {
          console.error("Error checking email:", error);
          setEmailError('Error checking email');
        }
      } else {
        setEmailError('Invalid email address');
      }
    };

    validateEmailOnInputChange();
  }, [formData.email]);

  // Handle username validation
  useEffect(() => {
    const validateUsernameOnInputChange = async () => {
      if (formData.username.length === 0) {
        setUsernameError('');
        return;
      }

      const re = /^[a-zA-Z0-9_]*$/;

      if (re.test(formData.username)) {
        try {
          const response = await axios.post('http://localhost:5000/auth/check-username', { username: formData.username });
          console.log(response);
          if (response.status === 200) {
            setUsernameError('');
          } else {
            setUsernameError(response.data.message);
          }
        } catch (error) {
          console.error("Error checking username:", error);
          setUsernameError('Error checking username');
        }
      } else {
        setUsernameError('Invalid username');
      }
    };

    validateUsernameOnInputChange();
  }, [formData.username]);

  // Handle password validation
  useEffect(() => {
    const validatePasswordOnInputChange = () => {
      if (formData.password.length === 0 || formData.password.length >= 8) {
        setPasswordError('');
        return;
      }

      if (formData.password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
      }
    };

    validatePasswordOnInputChange();
  }, [formData.password]);

  // Handle password confirmation validation
  useEffect(() => {
    const validatePasswordConfirmationOnInputChange = () => {
      if (formData.password.length === 0 || formData.password === formData.passwordConfirmation) {
        setPasswordConfirmationError('');
        return;
      }

      if (formData.password !== formData.passwordConfirmation) {
        setPasswordConfirmationError('Password does not match');
      }
    };

    validatePasswordConfirmationOnInputChange();
  }, [formData.password, formData.passwordConfirmation]);

  // Handle can register
  useEffect(() => {
    if ((emailError === '' && usernameError === '' && passwordError === '' && passwordConfirmationError === '') && formData.email.length > 0 && formData.username.length > 0 && formData.password.length > 0 && formData.passwordConfirmation.length > 0) {
      setCanRegister(true);
    } else {
      setCanRegister(false);
    }
  }, [emailError, usernameError, passwordError, passwordConfirmationError, formData.email, formData.username, formData.password, formData.passwordConfirmation]);

  // Toco Artwork
  const tucoBg = {
    backgroundImage: 'url("/images/tuco-artwork.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

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
              className="border-b-[1.5px] border-0 rounded-none outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue] mb-[40px]"
              placeholder="Your email"
              style={{
                borderColor: emailError ? 'red' : 'black',
                boxShadow: 'none',
              }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {emailError && (
              <div className="text-[red] Poppins400 text-[14px] absolute translate-y-[-40px]">
                {emailError}
              </div>
            )}
            <label className='text-orange Poppins800 text-[18px]'>
              Username
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]  mb-[40px]'
              placeholder='Your username'
              style={{
                borderColor: usernameError ? 'red' : 'black',
                boxShadow: 'none',
              }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {usernameError && (
              <div className="text-[red] Poppins400 text-[14px] absolute translate-y-[-40px]">
                {usernameError}
              </div>
            )}
            <label className='text-orange Poppins800 text-[18px]'>
              Password
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]  mb-[40px]'
              placeholder='Your password'
              style={{
                borderColor: passwordError ? 'red' : 'black',
                boxShadow: 'none',
              }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {passwordError && (
              <div className="text-[red] Poppins400 text-[14px] absolute translate-y-[-40px]">
                {passwordError}
              </div>
            )}
            <label className='text-orange Poppins800 text-[18px]'>
              Confirm Password
            </label>
            <input
              className='border-b-[1.5px] border-0 rounded-none outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue] '
              placeholder='Confirm your password'
              style={{
                borderColor: passwordConfirmationError ? 'red' : 'black',
                boxShadow: 'none',
              }}
              type='password'
              name='passwordConfirmation'
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
            />
            {passwordConfirmationError && (
              <div className="text-[red] Poppins400 text-[14px] absolute">
                {passwordConfirmationError}
              </div>
            )}
            <div className='flex justify-center mt-[80px] mb-[30px]'>
              {loading || !canRegister
                ? (
                  <div className='Poppins300 text-[20px] custom-button w-[250px] text-center opacity-60'>
                    Register
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
