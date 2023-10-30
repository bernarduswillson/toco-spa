import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import tuco from '@src/assets/images/tuco-artwork.png'
import logo from '@src/components/Icon/logo.svg'

const Register: React.FC = () => {
  const tucoBg = {
    backgroundImage: `url(${tuco.src})`,
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
              <Image src={logo} width={90} height={90} alt='logo' />
            </div>
            <div className='text-blue-orange-gradient Poppins700 text-[50px] text-center mb-[50px]'>
              Register
            </div>
            <label className='text-orange Poppins800 text-[18px]'>
              Email
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] mb-[40px]'
              placeholder='Your email'
              style={{ boxShadow: 'none' }}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Username
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] mb-[40px]'
              placeholder='Your username'
              style={{ boxShadow: 'none' }}
            />
            <label className='text-orange Poppins800 text-[18px]'>
            Password
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%] mb-[40px]'
              placeholder='Your password'
              style={{ boxShadow: 'none' }}
            />
            <label className='text-orange Poppins800 text-[18px]'>
              Confirm Password
            </label>
            <input
              type='text'
              className='border-b-[1.5px] border-0 rounded-none border-black outline-none pb-[5px] pl-[3px] w-full text-[18px] Poppins300 transition-all ease-in-out duration-300 focus:w-[103%]'
              placeholder='Confirm your password'
              style={{ boxShadow: 'none' }}
            />
            <div className='flex justify-center mt-[80px] mb-[30px]'>
              <div className='Poppins300 text-[20px] distinct-button w-[250px] text-center transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:opacity-60 active:translate-y-[3px]'>
                Register
              </div>
            </div>
            <div className='Poppins300 text-center text-grey underline'>
              <Link href='/login'>
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
