import React from 'react';
import { Link } from 'react-router-dom';

interface PageTitleProps {
  text: string;
  create?: boolean;
}

const PageTitle = (props: PageTitleProps) => {
  const { text, create } = props;

  return (
    <div className="w-full flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h1 className='text-[2rem] Poppins700 text-blue-orange-gradient inline md:text-[3rem]'>
        {text}
      </h1>
      {
        create ? 
        (
          <Link to="/exercise/create">
            <span
              className='Poppins400 text-xs text-white px-2 py-2 bg-[--orange] rounded-md w-fit h-fit cursor-pointer'
            >
              + New
            </span>
          </Link>
        ) : (null)
      }
    </div>
  );  
};

export default PageTitle;