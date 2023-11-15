import React from 'react';

const NotFound = () => {

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="w-fit h-fit flex flex-col text-center">
        <h1 className='Poppins600 text-[120px] text-[--orange]'>404</h1>
        <h2 className='Poppins400 text-sm text-black'>Page not found :/</h2>
      </div>
    </div>
  );
};

export default NotFound;
