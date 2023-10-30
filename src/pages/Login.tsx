import React from 'react'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const tucoBg = {
    backgroundImage: 'url("/images/tuco-artwork.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

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
              Login
            </div>
            <label className='text-orange Poppins800 text-[18px]'>
              Username
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue] mb-[40px]'
              placeholder='Your username'
              style={{ boxShadow: 'none' }}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Password
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] focus:border-[blue]'
              placeholder='Your password'
              style={{ boxShadow: 'none' }}
            />
            <div className='flex justify-center mt-[80px] mb-[30px]'>
              <div className='Poppins300 text-[20px] custom-button text-center transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:opacity-60 active:translate-y-[3px]'>
                Login
              </div>
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
  )
}

export default Login
