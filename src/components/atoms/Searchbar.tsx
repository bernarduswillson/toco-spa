import React from 'react';

interface SearchbarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Searchbar(props: SearchbarProps) {
  const { onChange } = props;

  return (
    <input
      type="text"
      name='search'
      placeholder='Search...'
      className='border-2 border-gray-400 text-gray-400 Poppins400 px-3 py-1 rounded-md w-full focus:outline-none'
      onChange={onChange}
    />
  );
};

export default Searchbar;